import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { Department } from './repositories/department.repository';

@Module({
  providers: [AuthService, Department],
  controllers: [AuthController]
})
export class DepartmentsModule {}
