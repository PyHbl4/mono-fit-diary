import { ApiProperty } from '@nestjs/swagger';

export class CreateSetDto {
  @ApiProperty({
    type: 'array',
    example: [
      { reps: 10, weight: 100 },
      { reps: 20, weight: 200 },
    ],
  })
  counts: {
    reps: number;
    weight: number;
  }[];
  @ApiProperty({ type: 'string', example: 'uuid' })
  userId: string;
  @ApiProperty({ type: 'string', example: 'uuid' })
  exerciseId: string;
  @ApiProperty({ type: 'string', example: 'uuid' })
  workoutId: string;
}
