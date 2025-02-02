import { Controller, Patch, Get, Param, Body, UseGuards, Delete, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { AssignDepartmentDto, CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { RolesGuard } from '../../../infrastructure/security/roles.guard';
import { Roles } from '../../../infrastructure/security/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Employee, Role } from '@prisma/client';

@ApiTags('Employees')
@ApiBearerAuth()
@Controller('employees')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'Employee created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires Admin or Manager role' })
  async createEmployee(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.createEmployee(dto);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee details retrieved' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async getEmployeeById(@Param('id') employeeId: string): Promise<Employee | null> {
    return this.employeeService.getEmployeeById(employeeId);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of employees' })
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: 200, description: 'Employee updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid employee data' })
  async updateEmployee(@Param('id') employeeId: string, @Body() dto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeService.updateEmployee(employeeId, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async deleteEmployee(@Param('id') employeeId: string): Promise<void> {
    return this.employeeService.deleteEmployee(employeeId);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Patch(':id/assign-department')
  @ApiOperation({ summary: 'Assign a department to an employee' })
  @ApiResponse({ status: 200, description: 'Employee assigned to department' })
  @ApiResponse({ status: 400, description: 'Invalid department ID' })
  async assignDepartment(@Param('id') employeeId: string, @Body() dto: AssignDepartmentDto): Promise<Employee> {
    return this.employeeService.assignDepartment(employeeId, dto);
  }
}
