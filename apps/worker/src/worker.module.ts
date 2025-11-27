import { Module } from '@nestjs/common';

import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  controllers: [WorkerController],
  imports: [],
  providers: [WorkerService],
})
export class WorkerModule {}
