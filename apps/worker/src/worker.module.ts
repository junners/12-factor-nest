import { AppConfigModule } from '@common/app-config';
import { BullQueueModule } from '@common/bull';
import { HealthCheckModule } from '@common/health-check';
import { Module } from '@nestjs/common';

import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  controllers: [WorkerController],
  imports: [HealthCheckModule, AppConfigModule, BullQueueModule],
  providers: [WorkerService],
})
export class WorkerModule {}
