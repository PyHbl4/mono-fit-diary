import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExGroupsService } from './ex-groups.service';
import { CreateExGroupDto } from './dto/create-ex-group.dto';
import { UpdateExGroupDto } from './dto/update-ex-group.dto';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('ex-groups')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token', example: 'Bearer token' })
export class ExGroupsController {
  constructor(private readonly exGroupsService: ExGroupsService) {}

  @Post()
  @ApiBody({ type: CreateExGroupDto })
  @ApiResponse({
    status: 201,
    description: 'The exGroup has been successfully created.',
    type: CreateExGroupDto,
  })
  create(@Body() createExGroupDto: CreateExGroupDto) {
    return this.exGroupsService.create(createExGroupDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [CreateExGroupDto],
  })
  findAll() {
    return this.exGroupsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: CreateExGroupDto,
  })
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
