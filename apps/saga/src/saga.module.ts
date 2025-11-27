import { AppConfigModule } from '@common/app-config';
import { BullQueueModule } from '@common/bull';
import { HealthCheckModule } from '@common/health-check';
import { Module } from '@nestjs/common';

import { SagaConsumer } from './saga-consumer/saga.consumer';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';

@Module({
  controllers: [SagaController],
  imports: [HealthCheckModule, AppConfigModule, BullQueueModule],
  providers: [SagaService, SagaConsumer],
})
export class SagaModule {}
