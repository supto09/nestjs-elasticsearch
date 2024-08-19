import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';
import { SearchModule } from '@/search/search.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, SearchModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
