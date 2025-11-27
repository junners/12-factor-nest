import { ICommand, IEvent } from '@nestjs/cqrs';

export class EnrichCommand implements ICommand {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}

export class EnrichedEvent implements IEvent {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}
