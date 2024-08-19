import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { UserRepository } from '@/users/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
    });
  }

  // Find all users
  async findAll() {
    return await this.userRepository.find(); // Retrieve all users from the database
  }

  // Find a single user by ID
  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id }); // Find user by ID
  }

  // Update a user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto); // Update user fields
    return await this.userRepository.findOneBy({ id }); // Return updated user
  }

  // Remove a user by ID
  async remove(id: number) {
    await this.userRepository.delete(id); // Delete user from the database
  }
}
