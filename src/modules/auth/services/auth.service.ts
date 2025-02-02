import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<Auth> {
    // Check if email is already registered
    const existingUser = await this.authRepository.findUserByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email already registered');

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create the user in the database
    const user = await this.authRepository.createUser(dto.email, hashedPassword, dto.role);

    // Return the user data 
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      password: hashedPassword,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    // Find user by email
    const user = await this.authRepository.findUserByEmail(dto.email);
    console.log(`user:${user}`);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT token
    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    console.log(`payload ${token}`)

    return { accessToken: token,...payload};
  }
}
