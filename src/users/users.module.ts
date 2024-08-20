import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from '@/users/services/users.service';
import { UsersController } from '@/users/controllers/users.controller';
import { UserEntity } from '@/users/entities/user.entity';
import { UserRepository } from '@/users/repositories/user.repository';
import { SearchModule } from '@/search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SearchModule],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
})
export class UsersModule {}
