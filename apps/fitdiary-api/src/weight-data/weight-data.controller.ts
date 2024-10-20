import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { WeightDataService } from './weight-data.service';
import { Prisma, Users } from '@prisma/client';

@Controller('weight-data')
export class WeightDataController {
  constructor(private readonly weightDataService: WeightDataService) {}

  @Get('/')
  async findAllByUser(@Req() req: Request & { user: Users }, @Query('orderBy') orderBy?: string, @Query('order') order?: 'ASC' | 'DESC') {
    return this.weightDataService.findAllByUser(req.user.uuid, orderBy, order);
  }

  @Post('/')
  async create(@Req() req: Request & { user: Users }, @Body() data: Prisma.WeightDataCreateInput) {
    return this.weightDataService.create(req.user.uuid, data);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: Prisma.WeightDataUpdateInput) {
    return this.weightDataService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request & { user: Users }, @Param('id') id: string) {
    return this.weightDataService.delete(req.user.uuid, id);
  }
}
