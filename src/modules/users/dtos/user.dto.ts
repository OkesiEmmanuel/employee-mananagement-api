import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Password123!', description: 'User password', minLength: 6 })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'EMPLOYEE', description: 'User role', enum: ['ADMIN', 'MANAGER', 'EMPLOYEE'] })
  @IsOptional()
  @IsEnum(Role)
  role?:Role;
}
