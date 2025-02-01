import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentRepository } from './department.repository';

describe('Department', () => {
  let provider: DepartmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentRepository],
    }).compile();

    provider = module.get<DepartmentRepository>(DepartmentRepository);
  });

});
