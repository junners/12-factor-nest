import { Controller, Get } from '@nestjs/common';

import { SagaService } from './saga.service';

@Controller()
export class SagaController {
  public constructor(private readonly sagaService: SagaService) {}

  @Get()
  public getHello(): string {
    return this.sagaService.getHello();
  }
}
