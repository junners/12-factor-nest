-- Event sourcing log partitioned by day. Designed as append-only for high ingest (~1M/day).

CREATE TABLE IF NOT EXISTS event_log (
  id          BIGINT GENERATED ALWAYS AS IDENTITY,
  aggregate_id UUID NOT NULL,
  event_type  TEXT NOT NULL,
  version     INTEGER NOT NULL DEFAULT 1,
  payload     JSONB NOT NULL,
  metadata    JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT event_log_pk PRIMARY KEY (created_at, id),
  -- Unique includes partition key (created_at) to satisfy Postgres partitioning rules.
  CONSTRAINT event_log_aggregate_version_unique UNIQUE (aggregate_id, version, created_at)
) PARTITION BY RANGE (created_at);

-- Table/column documentation.
COMMENT ON TABLE event_log IS
  'Append-only event stream; partitioned by created_at for ~1M/day ingest.';
COMMENT ON COLUMN event_log.id IS
  'Surrogate identity to keep PK uniqueness within a day partition.';
COMMENT ON COLUMN event_log.aggregate_id IS
  'Aggregate stream key (e.g., order-123, user-456) grouping one entity''s events.';
COMMENT ON COLUMN event_log.event_type IS
  'Domain event name (e.g., OrderPlaced, PaymentAuthorized).';
COMMENT ON COLUMN event_log.version IS
  'Per-aggregate sequence number (starts at 1) for ordering and optimistic concurrency.';
COMMENT ON COLUMN event_log.payload IS
  'Event body JSONB (e.g., {"total":4999,"currency":"USD"}).';
COMMENT ON COLUMN event_log.metadata IS
  'Aux data like actor/correlation IDs (e.g., {"actor":"user-456","corr":"req-abc"}).';
COMMENT ON COLUMN event_log.created_at IS
  'Append timestamp (UTC); partition key and used for time-window queries.';

-- Enforce append-only semantics.
CREATE OR REPLACE FUNCTION event_log_block_mutations()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'event_log is append-only';
END;
$$;

CREATE TRIGGER event_log_no_update
  BEFORE UPDATE ON event_log
  FOR EACH ROW EXECUTE FUNCTION event_log_block_mutations();

CREATE TRIGGER event_log_no_delete
  BEFORE DELETE ON event_log
  FOR EACH ROW EXECUTE FUNCTION event_log_block_mutations();

-- Indexes to keep reads fast.
CREATE INDEX IF NOT EXISTS event_log_aggregate_idx ON event_log (aggregate_id, created_at DESC);
CREATE INDEX IF NOT EXISTS event_log_created_brin ON event_log USING BRIN (created_at);

-- Pre-create daily partitions for the coming 3 months to avoid runtime DDL.
DO $$
DECLARE
  d DATE;
  part_name TEXT;
  from_ts TIMESTAMPTZ;
  to_ts TIMESTAMPTZ;
BEGIN
  FOR d IN SELECT generate_series(current_date, current_date + INTERVAL '3 months', INTERVAL '1 day')::date LOOP
    part_name := 'event_log_' || to_char(d, 'YYYYMMDD');
    from_ts := d::timestamptz;
    to_ts := (d + 1)::timestamptz;
    EXECUTE format(
      'CREATE TABLE IF NOT EXISTS %I PARTITION OF event_log FOR VALUES FROM (%L) TO (%L);',
      part_name,
      from_ts,
      to_ts
    );
  END LOOP;
END;
$$;
