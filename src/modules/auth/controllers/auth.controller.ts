import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { Auth } from '../entities/auth.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/infrastructure/security/roles.guard';
import { Roles } from 'src/infrastructure/security/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/infrastructure/security/auth.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: Auth })
  @ApiResponse({status: 409, description: 'Failed to register user' })
  async register(@Body() dto: RegisterDto): Promise<Auth> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and get a JWT token' })
  @ApiResponse({ status: 200, description: 'JWT token generated successfully' })
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(dto);
  }
 
  @Get('profile')
  @UseGuards(AuthGuard,RolesGuard, ) 
  @Roles(Role.ADMIN)
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Get logged-in user profile' })
  @ApiResponse({ status: 200, description: 'Returns user profile', type: Auth })
  async getProfile(@Req() req): Promise<Auth> {
    return req.user;
  }
}
