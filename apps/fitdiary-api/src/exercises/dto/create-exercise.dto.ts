import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ type: 'string', example: 'Грудные', description: 'Название упражнения' })
  name: string;

  @ApiProperty({ type: 'string', example: 'Описание', required: false, description: 'Описание упражнения' })
  description: string;

  @ApiProperty({ type: 'string', example: 'some_uuid', required: false, description: 'айдишник группы упражнений' })
  exerciseGroupId: string;
}

export class ReturningExerciseDto extends CreateExerciseDto {
  @ApiProperty({ type: 'object', properties: { uuid: { type: 'string' }, name: { type: 'string' }, userId: { type: 'string' }, description: { type: 'string' } } })
  exerciseGroup: { uuid: string };
}
