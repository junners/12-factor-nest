import { AppConfigModule, RedisConfig } from '@common/app-config';
import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  exports: [BullModule],
  imports: [
    AppConfigModule,
    BullModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConfig = configService.getOrThrow<RedisConfig>('redis');

        return {
          connection: {
            host: redisConfig.host,
            port: redisConfig.port,
          },
        };
      },
    }),
  ],
})
export class BullQueueModule {}
