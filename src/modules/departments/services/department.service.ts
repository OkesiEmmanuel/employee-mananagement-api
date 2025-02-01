import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from '../repositories/department.repository';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async createDepartment(dto: CreateDepartmentDto) {
    return this.departmentRepository.createDepartment(dto.name);
  }

  async getDepartmentById(departmentId: string) {
    const department = await this.departmentRepository.findDepartmentById(departmentId);
    if (!department) throw new NotFoundException(`Department with ID ${departmentId} not found`);
    return department;
  }

  async getAllDepartments() {
    return this.departmentRepository.findAllDepartments();
  }

  async updateDepartment(departmentId: string, dto: UpdateDepartmentDto) {
    return this.departmentRepository.updateDepartment(departmentId, dto);
  }

  async deleteDepartment(departmentId: string) {
    return this.departmentRepository.deleteDepartment(departmentId);
  }
}
