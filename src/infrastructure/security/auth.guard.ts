import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      console.log('Decoded JWT Payload:', payload);

      if (!payload.role) {
        throw new UnauthorizedException('Role not found in token');
      }

      // Attach the payload (including the role) to the request object
      request.user = payload;

      // Get the required roles from the route handler using the custom Roles decorator
      const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());

      // If no roles are required, or if the user's role matches, allow access
      if (!requiredRoles || requiredRoles.includes(payload.role)) {
        return true;
      }

      throw new UnauthorizedException('Forbidden: Insufficient role');
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
