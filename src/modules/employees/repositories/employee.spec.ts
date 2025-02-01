import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRepository } from './employee.repository';

describe('Employee', () => {
  let provider: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRepository],
    }).compile();

    provider = module.get<EmployeeRepository>(EmployeeRepository);
  });

});
