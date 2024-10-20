import { PartialType } from '@nestjs/mapped-types';
import { CreateExGroupDto } from './create-ex-group.dto';

export class UpdateExGroupDto extends PartialType(CreateExGroupDto) {}
