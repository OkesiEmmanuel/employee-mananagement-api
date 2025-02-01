import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { Employee } from './repositories/employee';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, Employee]
})
export class EmployeesModule {}
