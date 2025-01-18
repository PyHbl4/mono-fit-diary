import { Controller, Get, Post, Patch, Delete, Body, Param, Req } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { Prisma, Users } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('workouts')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token', example: 'Bearer token' })
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    type: [CreateWorkoutDto],
    description: 'Возвращает массив тренировок с сетами для авторизованного юзера',
  })
  async findAllByUser(@Req() req: Request & { user: Users }) {
    return this.workoutsService.findAllByUser(req.user.uuid);
  }

  @Post('/')
  @ApiBody({
    type: CreateWorkoutDto,
    description: 'Создание тренировки. В body кладётся массив sets.',
  })
  @ApiResponse({
    status: 201,
    type: CreateWorkoutDto,
    description: 'Возвращает созданную тренировку с сетами',
  })
  async create(@Req() req: Request & { user: Users }, @Body() data: Prisma.WorkoutsCreateInput & { sets: Prisma.SetsCreateInput[] }) {
    return this.workoutsService.createWorkout(req.user.uuid, data);
  }

  @Patch('/:id')
  @ApiBody({
    type: UpdateWorkoutDto,
  })
  @ApiResponse({
    status: 200,
    type: CreateWorkoutDto,
    description: 'Возвращает обновленную тренировку с сетами',
  })
  async update(@Param('id') id: string, @Body() data: Prisma.WorkoutsUpdateInput & { sets?: Prisma.SetsCreateInput[] }, @Req() req: Request & { user: Users }) {
    return this.workoutsService.updateWorkout(id, req.user.uuid, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req: Request & { user: Users }) {
    return this.workoutsService.deleteWorkout(id, req.user.uuid);
  }
}
