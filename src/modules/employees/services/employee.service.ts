import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { AssignDepartmentDto, CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createEmployee(dto: CreateEmployeeDto) {
    return this.employeeRepository.createEmployee(dto);
  }

  async getAllEmployees() {
    return this.employeeRepository.findAllEmployees();
  }

  async updateEmployee(employeeId: string, dto: UpdateEmployeeDto) {
    return this.employeeRepository.updateEmployee(employeeId, dto);
  }

  async deleteEmployee(employeeId: string) {
    return this.employeeRepository.deleteEmployee(employeeId);
  }
  
  async assignDepartment(employeeId: string, dto: AssignDepartmentDto) {
    const employee = await this.employeeRepository.findEmployeeById(employeeId);
    if (!employee) throw new NotFoundException(`Employee with ID ${employeeId} not found`);

    return this.employeeRepository.assignDepartment(employeeId, dto.departmentId);
  }

  async getEmployeeById(employeeId: string) {
    const employee = await this.employeeRepository.findEmployeeById(employeeId);
    if (!employee) throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    return employee;
  }
}
