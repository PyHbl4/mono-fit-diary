import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { WorkoutTemplateService } from './workout-template.service';
import { CreateWorkoutTemplateDto, WorkoutTemplateEntity } from './dto/create-workout-template.dto';
import { UpdateWorkoutTemplateDto } from './dto/update-workout-template.dto';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('workout-templates')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token', example: 'Bearer token' })
export class WorkoutTemplateController {
  constructor(private readonly workoutTemplateService: WorkoutTemplateService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Возвращает все шаблоны тренировок пользователя', type: [Object] })
  async findAll(@Req() req: Request & { user: any }) {
    return this.workoutTemplateService.findAllByUser(req.user.uuid);
  }

  @Get('/:uuid')
  @ApiResponse({ status: 200, description: 'Возвращает шаблон тренировки пользователя', type: Object })
  async findOne(@Req() req: Request & { user: any }, @Param('uuid') uuid: string) {
    return this.workoutTemplateService.findOne(req.user.uuid, uuid);
  }

  @Post('/')
  @ApiBody({ type: CreateWorkoutTemplateDto })
  @ApiResponse({ status: 201, description: 'Шаблон тренировки создан', type: WorkoutTemplateEntity })
  async create(@Req() req: Request & { user: any }, @Body() data: CreateWorkoutTemplateDto) {
    return this.workoutTemplateService.create(req.user.uuid, data);
  }

  @Patch('/:uuid')
  @ApiBody({ type: UpdateWorkoutTemplateDto })
  @ApiResponse({ status: 200, description: 'Шаблон тренировки обновлён', type: Object })
  async update(@Req() req: Request & { user: any }, @Param('uuid') uuid: string, @Body() data: UpdateWorkoutTemplateDto) {
    return this.workoutTemplateService.update(req.user.uuid, uuid, data);
  }

  @Delete('/:uuid')
  @ApiResponse({ status: 200, description: 'Шаблон тренировки удалён' })
  async delete(@Req() req: Request & { user: any }, @Param('uuid') uuid: string) {
    return this.workoutTemplateService.delete(req.user.uuid, uuid);
  }
}
