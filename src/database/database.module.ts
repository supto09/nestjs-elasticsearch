import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  POSTGRES_CONFIG_KEY,
  PostgresConfigType,
} from '@/config/configs/postgres.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const postgresConfig =
          configService.getOrThrow<PostgresConfigType>(POSTGRES_CONFIG_KEY);

        return {
          type: 'postgres',
          host: postgresConfig.host,
          port: 5432,
          username: postgresConfig.user,
          password: postgresConfig.password,
          database: postgresConfig.db,
          entities: [], // entities will be imported from other modules
          synchronize: true, // Set to false in production
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
