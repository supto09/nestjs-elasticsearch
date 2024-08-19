import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import elasticConfig from '@/config/configs/elastic.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [elasticConfig],
    }),
  ],
})
export class ConfigModule {}
