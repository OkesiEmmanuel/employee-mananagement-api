import { Controller, Patch, Get, Param, Body, UseGuards, Delete, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { AssignDepartmentDto, CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { RolesGuard } from '../../../infrastructure/security/roles.guard';
import { Roles } from '../../../infrastructure/security/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/infrastructure/security/auth.guard';

@ApiTags('Employees')
@ApiBearerAuth()
@Controller('employees')
@UseGuards(RolesGuard, AuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles('ADMIN', 'MANAGER')
  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'Employee created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires Admin or Manager role' })
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }

  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee details retrieved' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async getEmployeeById(@Param('id') employeeId: string) {
    return this.employeeService.getEmployeeById(employeeId);
  }

  @Roles('ADMIN', 'MANAGER')
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of employees' })
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: 200, description: 'Employee updated successfully' })
  async updateEmployee(@Param('id') employeeId: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(employeeId, dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  async deleteEmployee(@Param('id') employeeId: string) {
    return this.employeeService.deleteEmployee(employeeId);
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id/assign-department')
  @ApiOperation({ summary: 'Assign a department to an employee' })
  @ApiResponse({ status: 200, description: 'Employee assigned to department' })
  async assignDepartment(@Param('id') employeeId: string, @Body() dto: AssignDepartmentDto) {
    return this.employeeService.assignDepartment(employeeId, dto);
  }

}
