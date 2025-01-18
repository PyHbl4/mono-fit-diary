import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SetsService } from './sets.service';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Controller('sets')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token', example: 'Bearer token' })
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  @ApiBody({
    type: CreateSetDto,
  })
  @ApiResponse({
    status: 200,
    type: CreateSetDto,
  })
  create(@Body() data: Prisma.SetsCreateInput) {
    return this.setsService.create(data);
  }

  @Patch(':uuid')
  @ApiBody({
    type: UpdateSetDto,
  })
  update(@Param('uuid') uuid: string, @Body() data: Prisma.SetsUpdateInput) {
    return this.setsService.update(uuid, data);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.setsService.remove(uuid);
  }
}
