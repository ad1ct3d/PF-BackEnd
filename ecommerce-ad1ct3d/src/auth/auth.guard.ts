// auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    const [email, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');
    if (!email || !password) {
      throw new UnauthorizedException('Email or password is missing');
    }

    return true;
  }
}
