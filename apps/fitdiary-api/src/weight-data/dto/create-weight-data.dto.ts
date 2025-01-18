import { ApiProperty } from '@nestjs/swagger';

export class CreateWeightDataDto {
  @ApiProperty({ type: 'string', example: '2024-11-04 13:17:03.886', required: false, description: 'Дата. Если значение не передано, используется текущий DateTime' })
  date: Date;

  @ApiProperty({ type: 'integer', example: 120, required: true, description: 'Вес в кг' })
  weight: number;
}
