import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(data: { firstName: string; lastName: string; userId: string; departmentId?: string }): Promise<Employee> {
    return this.prisma.employee.create({
      data,
    });
  }

  async findAllEmployees(): Promise<Employee[]> {
    return this.prisma.employee.findMany();
  }

  async updateEmployee(employeeId: string, data: Partial<Employee>): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id: employeeId },
      data,
    });
  }

  async deleteEmployee(employeeId: string): Promise<void> {
    await this.prisma.employee.delete({
      where: { id: employeeId },
    });
  }

  async assignDepartment(employeeId: string, departmentId: string): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id: employeeId },
      data: { departmentId },
    });
  }

  async findEmployeeById(employeeId: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: { department: true }, 
    });
  }
}
