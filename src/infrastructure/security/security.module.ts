import { Module, Global } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Global() // Make security services available globally
@Module({
  providers: [AuthGuard, RolesGuard, ],
  exports: [AuthGuard, RolesGuard, ],
})
export class SecurityModule {}
