import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

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
  providers: [
    JwtStrategy,
    
  ],
  exports: [JwtModule, JwtStrategy],  
})
export class SecurityModule {}
