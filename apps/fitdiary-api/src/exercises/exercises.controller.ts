import { Body, Controller, Delete, Get, Param, Post, Patch, Req } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Prisma, Users } from '@prisma/client';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { CreateExerciseDto, ReturningExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token', example: 'Bearer token' })
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Все упражнения юзера', type: [ReturningExerciseDto] })
  async findAllByUser(@Req() req: Request & { user: Users }) {
    return this.exercisesService.findAllByUser(req.user.uuid);
  }

  @Get('/:uuid')
  @ApiResponse({ status: 200, description: 'Упражнение юзера', type: ReturningExerciseDto })
  async findOne(@Req() req: Request & { user: Users }, @Param('uuid') uuid: string) {
    return this.exercisesService.findOne(req.user.uuid, uuid);
  }

  @Post('/')
  @ApiBody({ type: CreateExerciseDto })
  @ApiResponse({ status: 201, description: 'Упражнение создано', type: ReturningExerciseDto })
  async create(@Req() req: Request & { user: Users }, @Body() data: Prisma.ExercisesCreateInput & { exerciseGroupId: string }) {
    return this.exercisesService.create(req.user.uuid, data);
  }

  @Patch('/:uuid')
  @ApiBody({ type: UpdateExerciseDto })
  @ApiResponse({ status: 200, description: 'Упражнение обновлено', type: ReturningExerciseDto })
  async update(@Req() req: Request & { user: Users }, @Param('uuid') uuid: string, @Body() data: Prisma.ExercisesUpdateInput) {
    return this.exercisesService.update(req.user.uuid, uuid, data);
  }

  @Delete('/:uuid')
  async delete(@Req() req: Request & { user: Users }, @Param('uuid') uuid: string) {
    return this.exercisesService.delete(req.user.uuid, uuid);
  }
}
