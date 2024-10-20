import { Test, TestingModule } from '@nestjs/testing';
import { ExGroupsService } from './ex-groups.service';

describe('ExGroupsService', () => {
  let service: ExGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExGroupsService],
    }).compile();

    service = module.get<ExGroupsService>(ExGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
