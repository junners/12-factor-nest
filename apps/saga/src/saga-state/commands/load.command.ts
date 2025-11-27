import { ICommand, IEvent } from '@nestjs/cqrs';

export class LoadCommand implements ICommand {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}

export class LoadedEvent implements IEvent {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}
