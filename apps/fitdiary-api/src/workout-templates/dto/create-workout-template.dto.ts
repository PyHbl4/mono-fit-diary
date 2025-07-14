import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutTemplateDto {
  @ApiProperty({ type: 'string', example: 'Full Body Workout', description: 'Название шаблона' })
  name: string;

  @ApiProperty({ type: [String], example: ['exercise-uuid-1', 'exercise-uuid-2'], description: 'Список идентификаторов упражнений' })
  exercises: string[];
}

export class WorkoutTemplateEntity extends CreateWorkoutTemplateDto {
  @ApiProperty({ type: 'string', example: 'random_uuid', description: 'uuid' })
  uuild: string;
}
