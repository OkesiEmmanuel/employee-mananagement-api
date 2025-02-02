import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import {  UpdateUserDto,  } from '../dtos/user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user;
  }

  async getUserByEmail(emailId: string) {
    const user = await this.userRepository.getUserByEmail(emailId);
    if (!user) throw new NotFoundException(`User with email ${emailId} not found`);
    return user;
  }

  async getAllUsers(page?: number, limit?: number) {
    return this.userRepository.getAllUsers();
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    return await this.userRepository.updateUser(userId, dto);
  }

  async updateUserRole(userId: string, role: Role) {
    return await this.userRepository.updateUserRole(userId, role);
  }

  async deleteUser(userId: string) {
    return await this.userRepository.deleteUser(userId);
  }
}
