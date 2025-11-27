import { Injectable } from '@nestjs/common';

@Injectable()
export class SagaService {
  public getHello(): string {
    return 'Hello World!';
  }
}
