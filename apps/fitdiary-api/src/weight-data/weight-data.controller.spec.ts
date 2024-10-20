import { Test, TestingModule } from '@nestjs/testing';
import { WeightDataController } from './weight-data.controller';
import { WeightDataService } from './weight-data.service';

describe('WeightDataController', () => {
  let controller: WeightDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightDataController],
      providers: [WeightDataService],
    }).compile();

    controller = module.get<WeightDataController>(WeightDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
