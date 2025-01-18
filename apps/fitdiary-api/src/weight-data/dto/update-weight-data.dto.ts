import { PartialType } from '@nestjs/swagger';
import { CreateWeightDataDto } from './create-weight-data.dto';

export class UpdateWeightDataDto extends PartialType(CreateWeightDataDto) {}
