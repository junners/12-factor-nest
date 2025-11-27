import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  public getHello(): string {
    return 'Hello World!';
  }
}
