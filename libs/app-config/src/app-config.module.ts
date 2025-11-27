import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { redis } from './app-config';

@Module({
  exports: [AppConfigModule],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redis],
    }),
  ],
  providers: [],
})
export class AppConfigModule {}
