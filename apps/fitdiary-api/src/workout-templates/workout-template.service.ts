import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkoutTemplateDto } from './dto/create-workout-template.dto';
import { UpdateWorkoutTemplateDto } from './dto/update-workout-template.dto';

@Injectable()
export class WorkoutTemplateService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<any[]> {
    try {
      const templates = await this.prisma.workoutTemplate.findMany({
        where: { userId },
      });
      const templatesWithExercises = await Promise.all(
        templates.map(async (template) => {
          const exercises = await this.prisma.exercises.findMany({
            where: { uuid: { in: template.exercises } },
          });
          return { ...template, exercises };
        }),
      );
      return templatesWithExercises;
    } catch (error) {
      throw new BadRequestException(error?.message || 'Failed to find workout templates');
    }
  }

  async findOne(userId: string, uuid: string): Promise<any> {
    try {
      const template = await this.prisma.workoutTemplate.findUnique({ where: { uuid } });
      if (!template) {
        throw new NotFoundException('Workout template not found');
      }
      if (template.userId !== userId) {
        throw new UnauthorizedException('Not authorized');
      }
      return template;
    } catch (error) {
      throw new BadRequestException(error?.message || 'Failed to retrieve workout template');
    }
  }

  async create(userId: string, data: CreateWorkoutTemplateDto): Promise<any> {
    try {
      return await this.prisma.workoutTemplate.create({
        data: {
          name: data.name,
          exercises: data.exercises,
          user: { connect: { uuid: userId } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message || 'Failed to create workout template');
    }
  }

  async update(userId: string, uuid: string, data: UpdateWorkoutTemplateDto): Promise<any> {
    try {
      const template = await this.prisma.workoutTemplate.findUnique({ where: { uuid } });
      if (!template) {
        throw new NotFoundException('Workout template not found');
      }
      if (template.userId !== userId) {
        throw new UnauthorizedException('Not authorized');
      }
      return await this.prisma.workoutTemplate.update({
        where: { uuid },
        data: {
          name: data.name,
          exercises: data.exercises,
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message || 'Failed to update workout template');
    }
  }

  async delete(userId: string, uuid: string): Promise<any> {
    try {
      const template = await this.prisma.workoutTemplate.findUnique({ where: { uuid } });
      if (!template) {
        throw new NotFoundException('Workout template not found');
      }
      if (template.userId !== userId) {
        throw new UnauthorizedException('Not authorized');
      }
      return await this.prisma.workoutTemplate.delete({ where: { uuid } });
    } catch (error) {
      throw new BadRequestException(error?.message || 'Failed to delete workout template');
    }
  }
}
