import { ICommand, IEvent } from '@nestjs/cqrs';

export class EndCommand implements ICommand {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}

export class SagaEndedEvent implements IEvent {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}
