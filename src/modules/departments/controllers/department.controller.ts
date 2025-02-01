import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
import { RolesGuard } from '../../../infrastructure/security/roles.guard';
import { Roles } from '../../../infrastructure/security/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/infrastructure/security/auth.guard';

@ApiTags('Departments')
@ApiBearerAuth()
@Controller('departments')
@UseGuards(RolesGuard, AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({ status: 201, description: 'Department created successfully' })
  async createDepartment(@Body() dto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(dto);
  }

  @Roles('ADMIN', 'MANAGER')
  @Get(':id')
  @ApiOperation({ summary: 'Get department by ID' })
  async getDepartmentById(@Param('id') departmentId: string) {
    return this.departmentService.getDepartmentById(departmentId);
  }

  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  async getAllDepartments() {
    return this.departmentService.getAllDepartments();
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update department' })
  async updateDepartment(@Param('id') departmentId: string, @Body() dto: UpdateDepartmentDto) {
    return this.departmentService.updateDepartment(departmentId, dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete department' })
  async deleteDepartment(@Param('id') departmentId: string) {
    return this.departmentService.deleteDepartment(departmentId);
  }
}
