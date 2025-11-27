import { IEvent } from '@nestjs/cqrs';

export class SagaStartedEvent implements IEvent {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}
