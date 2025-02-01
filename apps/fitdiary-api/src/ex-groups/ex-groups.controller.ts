import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ExGroupsService } from './ex-groups.service';
import { CreateExGroupDto } from './dto/create-ex-group.dto';
import { UpdateExGroupDto } from './dto/update-ex-group.dto';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { Prisma, Users } from '@prisma/client';

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
  async create(@Req() req: Request & { user: Users }, @Body() data: Prisma.ExerciseGroupsCreateInput) {
    return this.exGroupsService.create(req.user.uuid, data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [CreateExGroupDto],
  })
  findAllByUser(@Req() req: Request & { user: Users }) {
    return this.exGroupsService.findAllByUser(req.user.uuid);
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: CreateExGroupDto,
  })
  findOne(@Param('uuid') uuid: string, @Req() req: Request & { user: Users }) {
    return this.exGroupsService.findOne(req.user.uuid, uuid);
  }

  @Patch(':uuid')
  @ApiBody({ type: UpdateExGroupDto })
  update(@Param('uuid') uuid: string, @Req() req: Request & { user: Users }, @Body() data: Prisma.ExerciseGroupsUpdateInput) {
    return this.exGroupsService.update(req.user.uuid, uuid, data);
  }

  @Delete(':id')
  remove(@Param('id') uuid: string, @Req() req: Request & { user: Users }) {
    return this.exGroupsService.delete(req.user.uuid, uuid);
  }
}
