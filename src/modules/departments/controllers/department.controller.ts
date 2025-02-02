import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
import { RolesGuard } from '../../../infrastructure/security/roles.guard';
import { Roles } from '../../../infrastructure/security/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
import { Department, Role } from '@prisma/client';
import { AuthGuard } from 'src/infrastructure/security/auth.guard';

@ApiTags('Departments')
@ApiBearerAuth()
@Controller('departments')
@UseGuards(AuthGuard, RolesGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({ status: 201, description: 'Department created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires Admin role' })
  async createDepartment(@Body() dto: CreateDepartmentDto): Promise<Department> {
    return this.departmentService.createDepartment(dto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':id')
  @ApiOperation({ summary: 'Get department by ID' })
  @ApiResponse({ status: 200, description: 'Department retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async getDepartmentById(@Param('id') departmentId: string): Promise<Department | null> {
    return this.departmentService.getDepartmentById(departmentId);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({ status: 200, description: 'List of departments retrieved' })
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentService.getAllDepartments();
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update department' })
  @ApiResponse({ status: 200, description: 'Department updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid department data' })
  async updateDepartment(@Param('id') departmentId: string, @Body() dto: UpdateDepartmentDto): Promise<Department> {
    return this.departmentService.updateDepartment(departmentId, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete department' })
  @ApiResponse({ status: 200, description: 'Department deleted successfully' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async deleteDepartment(@Param('id') departmentId: string): Promise<void> {
    return this.departmentService.deleteDepartment(departmentId);
  }
}
