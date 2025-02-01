import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { RateLimitMiddleware } from './rateLimiter.middleware';

@Global() 
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({ 
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthGuard, RolesGuard, RateLimitMiddleware],
  exports: [AuthGuard, RolesGuard, JwtModule, RateLimitMiddleware],
})
export class SecurityModule {}
