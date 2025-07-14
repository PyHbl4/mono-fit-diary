import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutTemplateController } from './workout-template.controller';

describe('WorkoutTemplateController', () => {
  let controller: WorkoutTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutTemplateController],
    }).compile();

    controller = module.get<WorkoutTemplateController>(WorkoutTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
