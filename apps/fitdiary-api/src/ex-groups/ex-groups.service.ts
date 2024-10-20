import { Injectable } from '@nestjs/common';
import { CreateExGroupDto } from './dto/create-ex-group.dto';
import { UpdateExGroupDto } from './dto/update-ex-group.dto';

@Injectable()
export class ExGroupsService {
  create(createExGroupDto: CreateExGroupDto) {
    return 'This action adds a new exGroup';
  }

  findAll() {
    return `This action returns all exGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exGroup`;
  }

  update(id: number, updateExGroupDto: UpdateExGroupDto) {
    return `This action updates a #${id} exGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} exGroup`;
  }
}
