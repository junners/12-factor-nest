import { HealthCheckModule } from '@common/health-check';
import { Module } from '@nestjs/common';

import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';

@Module({
  controllers: [SagaController],
  imports: [HealthCheckModule],
  providers: [SagaService],
})
export class SagaModule {}
