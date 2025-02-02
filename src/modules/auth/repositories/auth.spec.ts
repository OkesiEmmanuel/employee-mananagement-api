import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Role } from '@prisma/client';

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRepository,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
    prismaService = module.get<PrismaService>(PrismaService); // Corrected line
  });

  describe('createUser', () => {
    it('should create a user and return user data', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
        role: Role.EMPLOYEE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await authRepository.createUser(
        createUserDto.email,
        createUserDto.password,
      );

      expect(result).toEqual(mockUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          role: Role.EMPLOYEE,
        },
      });
    });
  });

  describe('findUserByEmail', () => {
    it('should return user data if user exists', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
        role: Role.EMPLOYEE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await authRepository.findUserByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    });

    it('should return null if user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await authRepository.findUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });
});
