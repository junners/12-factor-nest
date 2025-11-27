import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

import { EndCommand, SagaEndedEvent } from './commands/end.command';
import { EnrichCommand, EnrichedEvent } from './commands/enrich.command';
import { ExtractCommand, ExtractedEvent } from './commands/extract.command';
import { LoadCommand, LoadedEvent } from './commands/load.command';
import {
  TransformCommand,
  TransformedEvent,
} from './commands/transform.command';
import { SagaStartedEvent } from './events/saga-started.event';

@Injectable()
export class SagaState {
  @Saga()
  public saga01Start = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SagaStartedEvent),
      map((event) => new ExtractCommand(event.sagaId, event.payload)),
    );
  };

  @Saga()
  public saga02Extract = (
    events$: Observable<IEvent>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ExtractedEvent),
      map((event) => new TransformCommand(event.sagaId, event.payload)),
    );
  };

  @Saga()
  public saga03Transform = (
    events$: Observable<IEvent>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(TransformedEvent),
      map((event) => new EnrichCommand(event.sagaId, event.payload)),
    );
  };

  @Saga()
  public saga04Enrich = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(EnrichedEvent),
      map((event) => new LoadCommand(event.sagaId, event.payload)),
    );
  };

  @Saga()
  public saga05Load = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LoadedEvent),
      map((event) => new EndCommand(event.sagaId, event.payload)),
    );
  };

  @Saga()
  public saga06End = (events$: Observable<IEvent>): Observable<void> => {
    return events$.pipe(
      ofType(SagaEndedEvent),
      map(() => {}),
    );
  };
}

export { EndCommand, SagaEndedEvent } from './commands/end.command';
export { EnrichCommand, EnrichedEvent } from './commands/enrich.command';
export { ExtractCommand, ExtractedEvent } from './commands/extract.command';
export { LoadCommand, LoadedEvent } from './commands/load.command';
export {
  TransformCommand,
  TransformedEvent,
} from './commands/transform.command';

export { SagaStartedEvent } from './events/saga-started.event';
