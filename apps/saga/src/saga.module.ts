import { AppConfigModule } from '@common/app-config';
import { HealthCheckModule } from '@common/health-check';
import { Module } from '@nestjs/common';

import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';

@Module({
  controllers: [SagaController],
  imports: [HealthCheckModule, AppConfigModule],
  providers: [SagaService],
})
export class SagaModule {}
