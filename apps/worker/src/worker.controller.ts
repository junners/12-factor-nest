import { Controller, Get } from '@nestjs/common';

import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  public constructor(private readonly workerService: WorkerService) {}

  @Get()
  public getHello(): string {
    return this.workerService.getHello();
  }
}
