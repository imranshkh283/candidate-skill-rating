import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from 'src/utils';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Please login again');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.BACKEND_JWT_SECRET,
      });

      request['user'] = payload;

      return true;
    } catch (e) {
      throw new UnauthorizedException(
        e.message || 'Invalid token, please login',
      );
    }
  }
}
