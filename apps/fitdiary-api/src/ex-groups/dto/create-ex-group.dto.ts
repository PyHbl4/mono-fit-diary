import { ApiProperty } from '@nestjs/swagger';

export class CreateExGroupDto {
  @ApiProperty({ type: 'string', example: 'Грудные', description: 'Название группы упражнений' })
  name: string;
  @ApiProperty({ type: 'string', example: 'Описание', required: false, description: 'Описание группы упражнений' })
  description: string;
}
