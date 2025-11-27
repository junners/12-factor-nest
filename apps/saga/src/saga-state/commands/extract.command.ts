import { ICommand, IEvent } from '@nestjs/cqrs';

export class ExtractCommand implements ICommand {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}

export class ExtractedEvent implements IEvent {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}
