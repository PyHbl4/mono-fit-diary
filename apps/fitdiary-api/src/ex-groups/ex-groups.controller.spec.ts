import { Test, TestingModule } from '@nestjs/testing';
import { ExGroupsController } from './ex-groups.controller';
import { ExGroupsService } from './ex-groups.service';

describe('ExGroupsController', () => {
  let controller: ExGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExGroupsController],
      providers: [ExGroupsService],
    }).compile();

    controller = module.get<ExGroupsController>(ExGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
