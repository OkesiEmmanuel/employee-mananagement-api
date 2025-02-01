import { Test, TestingModule } from '@nestjs/testing';
import { Auth } from './auth.repository';

describe('Auth', () => {
  let provider: Auth;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth],
    }).compile();

    provider = module.get<Auth>(Auth);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
