import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService], 
})
export class UserModule {}

