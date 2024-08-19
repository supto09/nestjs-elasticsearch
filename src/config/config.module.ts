import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import elasticConfig from '@/config/configs/elastic.config';
import postgresConfig from '@/config/configs/postgres.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [elasticConfig, postgresConfig],
    }),
  ],
})
export class ConfigModule {}
