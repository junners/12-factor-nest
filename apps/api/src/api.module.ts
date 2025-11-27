import { AppConfigModule } from '@common/app-config';
import { HealthCheckModule } from '@common/health-check';
import { Module } from '@nestjs/common';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  imports: [HealthCheckModule, AppConfigModule],
  providers: [ApiService],
})
export class ApiModule {}
