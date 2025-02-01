import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { AuthService } from './modules/auth/services/auth.service';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './infrastructure/security/security.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [AuthModule, SecurityModule, PrismaModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
