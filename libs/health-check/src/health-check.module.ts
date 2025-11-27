import { Module } from '@nestjs/common';

import { LivezController } from './livez.controller';
import { ReadyzController } from './readyz.controller';
import { StartzController } from './startz.controller';

@Module({
  controllers: [ReadyzController, StartzController, LivezController],
  exports: [],
  providers: [],
})
export class HealthCheckModule {}
