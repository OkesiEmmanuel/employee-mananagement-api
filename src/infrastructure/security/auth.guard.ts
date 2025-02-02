import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.warn('Authorization header is missing');
      throw new UnauthorizedException('Authentication token is required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.warn('Invalid authentication token format');
      throw new UnauthorizedException('Invalid authentication token format');
    }

    try {
      const payload = this.jwtService.verify(token);
      console.log('Decoded JWT Payload:', payload);

      if (!payload.role) {
        console.warn('User role is missing in token');
        throw new UnauthorizedException('User role is missing in token');
      }

      request.user = payload;

      const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());

      if (!requiredRoles || requiredRoles.includes(payload.role)) {
        return true;
      }

      console.warn('Access denied: Insufficient role');
      throw new ForbiddenException('You don’t have access to this resource');
    } catch (error) {
      console.error('Error verifying token:', error.message);

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Authentication token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid authentication token');
      }

      throw new UnauthorizedException('Authentication failed');
    }
  }
}
