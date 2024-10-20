import { Controller, Get, Post, Patch, Delete, Body, Param, Req } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { Prisma, Users } from '@prisma/client';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('/')
  async findAllByUser(@Req() req: Request & { user: Users }) {
    return this.workoutsService.findAllByUser(req.user.uuid);
  }

  @Post('/')
  async create(@Req() req: Request & { user: Users }, @Body() data: Prisma.WorkoutsCreateInput & { sets: Prisma.SetsCreateInput[] }) {
    return this.workoutsService.createWorkout(req.user.uuid, data);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: Prisma.WorkoutsUpdateInput & { sets?: Prisma.SetsCreateInput[] }, @Req() req: Request & { user: Users }) {
    return this.workoutsService.updateWorkout(id, req.user.uuid, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req: Request & { user: Users }) {
    return this.workoutsService.deleteWorkout(id, req.user.uuid);
  }
}
