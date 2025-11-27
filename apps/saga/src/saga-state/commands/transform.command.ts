import { ICommand, IEvent } from '@nestjs/cqrs';

export class TransformCommand implements ICommand {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}

export class TransformedEvent implements IEvent {
  public constructor(
    public readonly sagaId?: string,
    public readonly payload?: unknown,
  ) {}
}
