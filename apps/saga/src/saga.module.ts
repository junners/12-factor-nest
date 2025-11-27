import { AppConfigModule } from '@common/app-config';
import { BullQueueModule } from '@common/bull';
import { HealthCheckModule } from '@common/health-check';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SagaConsumer } from './saga-consumer/saga.consumer';
import { SagaState } from './saga-state/saga.state';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';

@Module({
  controllers: [SagaController],
  imports: [
    HealthCheckModule,
    AppConfigModule,
    BullQueueModule,
    CqrsModule.forRoot(),
  ],
  providers: [SagaService, SagaConsumer, SagaState],
})
export class SagaModule {}
