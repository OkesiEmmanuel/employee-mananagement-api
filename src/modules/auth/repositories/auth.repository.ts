import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../interfaces/auth.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Auth } from '../entities/auth.entity';
import { Role } from '@prisma/client';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, password: string, role: Role= Role.EMPLOYEE): Promise<Auth> {
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: password,
        role: role,
      },
    });

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findUserByEmail(email: string): Promise<Auth | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,  
        createdAt: true,
        updatedAt: true,
      },
    });
  
    if (!user) return null;
  
    return user;
  }
  
}
