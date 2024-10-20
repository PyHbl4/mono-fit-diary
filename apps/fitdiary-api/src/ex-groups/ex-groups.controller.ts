import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExGroupsService } from './ex-groups.service';
import { CreateExGroupDto } from './dto/create-ex-group.dto';
import { UpdateExGroupDto } from './dto/update-ex-group.dto';

@Controller('ex-groups')
export class ExGroupsController {
  constructor(private readonly exGroupsService: ExGroupsService) {}

  @Post()
  create(@Body() createExGroupDto: CreateExGroupDto) {
    return this.exGroupsService.create(createExGroupDto);
  }

  @Get()
  findAll() {
    return this.exGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExGroupDto: UpdateExGroupDto) {
    return this.exGroupsService.update(+id, updateExGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exGroupsService.remove(+id);
  }
}
