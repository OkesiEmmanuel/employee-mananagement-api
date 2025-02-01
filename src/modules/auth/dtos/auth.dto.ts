import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!', description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'EMPLOYEE', description: 'User role', enum: ['ADMIN', 'MANAGER', 'EMPLOYEE'] })
  @IsEnum(['ADMIN', 'MANAGER', 'EMPLOYEE'])
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!', description: 'User password' })
  @IsNotEmpty()
  password: string;
}
