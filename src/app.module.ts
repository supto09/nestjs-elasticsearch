import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';
import { SearchModule } from '@/search/search.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule,
    SearchModule,
    DatabaseModule,
    UsersModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
