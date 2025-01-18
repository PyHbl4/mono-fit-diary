import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { WeightDataService } from './weight-data.service';
import { Prisma, Users } from '@prisma/client';
import { ApiBody, ApiHeader, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateWeightDataDto } from './dto/create-weight-data.dto';
import { UpdateWeightDataDto } from './dto/update-weight-data.dto';

@Controller('weight-data')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token', example: 'Bearer token' })
export class WeightDataController {
  constructor(private readonly weightDataService: WeightDataService) {}

  @Get('/')
  @ApiQuery({ name: 'orderBy', enum: ['date', 'weight'], required: false, description: 'Можно сортировать по дате и весу. Значение по умолчанию - date' })
  @ApiQuery({ name: 'order', enum: ['ASC', 'DESC'], required: false, description: 'Значение по умолчанию - DESC' })
  @ApiResponse({ status: 200, type: [CreateWeightDataDto], description: 'Возвращает список взвешиваний пользователя' })
  async findAllByUser(@Req() req: Request & { user: Users }, @Query('orderBy') orderBy?: string, @Query('order') order?: 'ASC' | 'DESC') {
    return this.weightDataService.findAllByUser(req.user.uuid, orderBy, order);
  }

  @Post('/')
  @ApiBody({ type: CreateWeightDataDto })
  @ApiResponse({ status: 201, type: CreateWeightDataDto })
  async create(@Req() req: Request & { user: Users }, @Body() data: Prisma.WeightDataCreateInput) {
    return this.weightDataService.create(req.user.uuid, data);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateWeightDataDto })
  @ApiResponse({ status: 200, type: CreateWeightDataDto })
  async update(@Param('id') id: string, @Body() data: Prisma.WeightDataUpdateInput) {
    return this.weightDataService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request & { user: Users }, @Param('id') id: string) {
    return this.weightDataService.delete(req.user.uuid, id);
  }
}
