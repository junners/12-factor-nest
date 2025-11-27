import { Module } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { StartupController } from './startup.controller';
import { ReadyzController } from './readyz.controller';
import { StartzController } from './startz.controller';

@Module({
  providers: [HealthCheckService],
  exports: [HealthCheckService],
  controllers: [StartupController, ReadyzController, StartzController],
})
export class HealthCheckModule {}
