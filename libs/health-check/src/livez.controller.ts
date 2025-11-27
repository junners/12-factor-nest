import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/livez')
export class LivezController {
  @Get()
  @HttpCode(200)
  public livez(): { message: string } {
    return { message: 'ok' };
  }
}
