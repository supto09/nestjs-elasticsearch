import { Module } from '@nestjs/common';
import { UsersService } from '@/users/services/users.service';
import { UsersController } from '@/users/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { UserRepository } from '@/users/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
})
export class UsersModule {}
