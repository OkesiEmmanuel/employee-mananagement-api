import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Department } from '@prisma/client';

@Injectable()
export class DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDepartment(name: string): Promise<Department> {
    return this.prisma.department.create({
      data: { name },
    });
  }

  async findDepartmentById(departmentId: string): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: { id: departmentId },
    });
  }

  async findAllDepartments(): Promise<Department[]> {
    return this.prisma.department.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateDepartment(departmentId: string, data: Partial<Department>): Promise<Department> {
    return this.prisma.department.update({
      where: { id: departmentId },
      data,
    });
  }

  async deleteDepartment(departmentId: string): Promise<void> {
    await this.prisma.department.delete({
      where: { id: departmentId },
    });
  }
}
