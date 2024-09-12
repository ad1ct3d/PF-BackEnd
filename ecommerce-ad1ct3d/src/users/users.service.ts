import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repositry';
import { CreateUserDto, UpdateUserDto } from './User.dto';
import { PaginationDto } from '../paginator/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
    console.log(this.usersRepository);
  }

  async getUsers(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const { results, total } = await this.usersRepository.getUsers(page, limit);

    return {
      results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
      role: user.role,
    };
  }

  async addUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = {
      ...createUserDto,
      password: hashedPassword,
    };
    console.log(createUserDto.birthdate);
    await this.usersRepository.addUser(newUser);
    return {
      ...newUser,
      password: undefined,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        country: user.country,
        city: user.city,
        role: user.role,
      };
    }
    return null;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }

    const updatedUser = { ...user, ...updateUserDto };

    await this.usersRepository.updateUser(updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteUser(id);

    return { message: 'User deleted succesfully' };
  }
}
