import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<{ results: User[]; total: number }> {
    const [results, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { results, total };
  }

  async getUserById(id: string) {
    const foundUser = await this.usersRepository.findOne({ where: { id } });
    return foundUser ? foundUser : null;
  }

  async addUser(user: any) {
    if (
      !user ||
      !user.name ||
      !user.birthdate ||
      !user.email ||
      !user.password ||
      !user.address ||
      !user.phone
    ) {
      throw new BadRequestException('Missing required fields');
    }

    user.birthdate = new Date(user.birthdate);
    console.log(user.birthdate);

    const exisitingUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (exisitingUser) {
      throw new BadRequestException(`email ${user.email} already in use`);
    }

    const newUser = this.usersRepository.create(user);
    console.log(newUser);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(updatedUser: User) {
    return this.usersRepository.save(updatedUser);
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
    return id;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}

export default User;
