import { Module } from '@nestjs/common';
import { ReadyzController } from './readyz.controller';
import { StartzController } from './startz.controller';
import { LivezController } from './livez.controller';

@Module({
  providers: [],
  exports: [],
  controllers: [ReadyzController, StartzController, LivezController],
})
export class HealthCheckModule {}
