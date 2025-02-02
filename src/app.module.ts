import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './infrastructure/security/security.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserModule } from './modules/users/users.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [AuthModule, UserModule, DepartmentsModule, EmployeesModule, SecurityModule, PrismaModule ],
  controllers: [],
  providers: [
  ]
})
export class AppModule {}
