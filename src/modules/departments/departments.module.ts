import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentRepository } from './repositories/department.repository';

@Module({
  providers: [DepartmentService, DepartmentRepository],
  controllers: [DepartmentController]
})
export class DepartmentsModule {}
