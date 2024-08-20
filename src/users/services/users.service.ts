import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { UserRepository } from '@/users/repositories/user.repository';
import UserSearchService from '@/search/services/user-search.service';
import { SearchUserDto } from '@/users/dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSearchService: UserSearchService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
    });

    await this.userSearchService.indexUser({
      id: createdUser.id,
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
    });

    return createdUser;
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
    const updatedUser = await this.userRepository.findOneBy({ id }); // Return updated user

    if (updatedUser) {
      await this.userSearchService.indexUser({
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      });
    }

    return updatedUser;
  }

  // Remove a user by ID
  async remove(id: number) {
    await this.userRepository.delete(id); // Delete user from the database
    await this.userSearchService.removeIndex(id);
  }

  search(searchUsers: SearchUserDto) {
    return this.userSearchService.search({
      searchText: searchUsers.searchText,
      sortBy: searchUsers.sortBy,
      order: searchUsers.order,
      page: searchUsers.page,
      size: searchUsers.size,
    });
  }
}
