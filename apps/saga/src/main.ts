import { NestFactory } from '@nestjs/core';
import { SagaModule } from './saga.module';

async function bootstrap() {
  const app = await NestFactory.create(SagaModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
