import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ type: 'string', example: 'Грудные', description: 'Название упражнения' })
  name: string;

  @ApiProperty({ type: 'string', example: 'Описание', required: false, description: 'Описание упражнения' })
  description: string;
}
