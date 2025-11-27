import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';

import {
  EndCommand,
  EnrichCommand,
  EnrichedEvent,
  ExtractCommand,
  ExtractedEvent,
  LoadCommand,
  LoadedEvent,
  SagaEndedEvent,
  SagaStartedEvent,
  SagaState,
  TransformCommand,
  TransformedEvent,
} from './saga.state';

describe('SagaState', () => {
  let provider: SagaState;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SagaState],
    }).compile();

    provider = module.get<SagaState>(SagaState);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('saga pipeline', () => {
    it('starts with ExtractCommand when saga starts', async () => {
      const command$ = provider.saga01Start(of(new SagaStartedEvent()));

      const command = await firstValueFrom(command$);
      expect(command).toBeInstanceOf(ExtractCommand);
    });

    it('moves to TransformCommand after extraction', async () => {
      const command$ = provider.saga02Extract(of(new ExtractedEvent()));

      const command = await firstValueFrom(command$);
      expect(command).toBeInstanceOf(TransformCommand);
    });

    it('moves to EnrichCommand after transform', async () => {
      const command$ = provider.saga03Transform(of(new TransformedEvent()));

      const command = await firstValueFrom(command$);
      expect(command).toBeInstanceOf(EnrichCommand);
    });

    it('moves to LoadCommand after enrichment', async () => {
      const command$ = provider.saga04Enrich(of(new EnrichedEvent()));

      const command = await firstValueFrom(command$);
      expect(command).toBeInstanceOf(LoadCommand);
    });

    it('ends with EndCommand after load', async () => {
      const command$ = provider.saga05Load(of(new LoadedEvent()));

      const command = await firstValueFrom(command$);
      expect(command).toBeInstanceOf(EndCommand);
    });

    it('completes with no command after saga end', async () => {
      const result$ = provider.saga06End(of(new SagaEndedEvent()));

      const result = await firstValueFrom(result$);
      expect(result).toBeUndefined();
    });
  });
});
