import { PartialType } from '@nestjs/swagger';
import { CreateExGroupDto } from './create-ex-group.dto';

export class UpdateExGroupDto extends PartialType(CreateExGroupDto) {}
