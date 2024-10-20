import { Test, TestingModule } from '@nestjs/testing';
import { WeightDataService } from './weight-data.service';

describe('WeightDataService', () => {
  let service: WeightDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightDataService],
    }).compile();

    service = module.get<WeightDataService>(WeightDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
