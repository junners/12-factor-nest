import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/readyz')
export class ReadyzController {
  @Get()
  @HttpCode(200)
  public readyz(): { message: string } {
    return { message: 'ok' };
  }
}
