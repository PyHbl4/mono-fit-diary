import { Body, Controller, Delete, Get, Param, Post, Patch, Req } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Prisma, Users } from '@prisma/client';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('/')
  async findAllByUser(@Req() req: Request & { user: Users }) {
    return this.exercisesService.findAllByUser(req.user.uuid);
  }

  @Post('/')
  async create(@Req() req: Request & { user: Users }, @Body() data: Prisma.ExercisesCreateInput) {
    return this.exercisesService.create(req.user.uuid, data);
  }

  @Patch('/:uuid')
  async update(@Req() req: Request & { user: Users }, @Param('uuid') uuid: string, @Body() data: Prisma.ExercisesUpdateInput) {
    return this.exercisesService.update(uuid, data);
  }

  @Delete('/:uuid')
  async delete(@Req() req: Request & { user: Users }, @Param('uuid') uuid: string) {
    return this.exercisesService.delete(uuid);
  }
}
