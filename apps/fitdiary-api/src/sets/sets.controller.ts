import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SetsService } from './sets.service';
import { Prisma } from '@prisma/client';

@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  create(@Body() data: Prisma.SetsCreateInput) {
    return this.setsService.create(data);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() data: Prisma.SetsUpdateInput) {
    return this.setsService.update(uuid, data);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.setsService.remove(uuid);
  }
}
