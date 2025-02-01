import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { IUserRepository } from '../interfaces/user.interface';


@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string): Promise<Auth | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUserByEmail(email: string): Promise<Auth | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getAllUsers(): Promise<Auth[] | null> {
    return await this.prisma.user.findMany();
  }

  async updateUser(userId: string, data: Partial<Auth>): Promise<Auth> {
    return await this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async updateUserRole(userId: string, role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'): Promise<Auth> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
