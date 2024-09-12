import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from '../users/users.repositry';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: User, password: string) {
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    /* const payload = { username: user.email, sub: user.id, role: user.role }; */

    return { message: 'Login successful', userId: user.id };
  }

  async generateToken(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}
