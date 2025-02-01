import { ApiProperty } from '@nestjs/swagger';
import { CreateSetDto } from 'src/sets/dto/create-set.dto';

export class CreateWorkoutDto {
  @ApiProperty({
    type: 'array',
    example: [
      {
        counts: [{ reps: 10, weight: 100 }],
        exerciseId: 'uuid',
      },
    ],
  })
  sets: CreateSetDto[];

  // @ApiProperty({ type: 'string', example: 'uuid (можно не передавать, бэк вытащит из авторизации', required: false })
  // userId: string;

  @ApiProperty({ type: 'string', example: 'Chest day' })
  name: string;

  @ApiProperty({ type: 'string', example: 'Some workout description', required: false })
  description: string;

  @ApiProperty({ type: 'string', example: '2024-11-04 13:17:03.886', required: false })
  date: Date;

  @ApiProperty({ type: 'integer', example: 120, required: false })
  duration: number;

  @ApiProperty({ type: 'integer', example: 600, required: false })
  calories: number;
}
