import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { AuthService } from './modules/auth/services/auth.service';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './infrastructure/security/security.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserModule } from './modules/users/users.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './infrastructure/security/roles.guard';
import { AuthGuard } from './infrastructure/security/auth.guard';

@Module({
  imports: [AuthModule, UserModule, DepartmentsModule, EmployeesModule, SecurityModule, PrismaModule ],
  controllers: [],
  providers: [
  ]
})
export class AppModule {}
