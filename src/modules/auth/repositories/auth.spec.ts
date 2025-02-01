import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';

describe('Auth', () => {
  let provider: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepository],
    }).compile();

    provider = module.get<AuthRepository>(AuthRepository);
  });
});
