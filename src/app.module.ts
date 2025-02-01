import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { AuthService } from './modules/auth/services/auth.service';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
