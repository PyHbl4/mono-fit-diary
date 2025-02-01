import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Exercises, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<Exercises[]> {
    try {
      return this.prisma.exercises.findMany({
        where: {
          userId: userId,
        },
        include: {
          exerciseGroup: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to find exercises');
    }
  }

  async findOne(userId: string, uuid: string): Promise<Exercises> {
    try {
      const exercise = await this.prisma.exercises.findUnique({ where: { uuid: uuid }, include: { exerciseGroup: true } });
      if (!exercise) {
        throw new NotFoundException('Exercise not found');
      }
      if (exercise.userId !== userId) {
        throw new UnauthorizedException('Not authorized');
      }
      return exercise;
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to find exercise');
    }
  }

  async create(userId: string, data: Prisma.ExercisesCreateInput & { exerciseGroupId: string }): Promise<Exercises> {
    try {
      const exercise = await this.prisma.exercises.create({
        data: {
          name: data.name,
          description: data.description,
          user: {
            connect: { uuid: userId },
          },
          ...(data.exerciseGroupId && { exerciseGroup: { connect: { uuid: data.exerciseGroupId } } }),
        },
        include: {
          exerciseGroup: true,
        },
      });
      return exercise;
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to create exercise');
    }
  }

  async update(userId: string, uuid: string, data: Prisma.ExercisesUpdateInput & { exerciseGroupId: string }): Promise<Exercises> {
    try {
      const exercise = await this.prisma.exercises.findUnique({ where: { uuid: uuid } });
      if (!exercise) {
        throw new Error('Exercise not found');
      }
      if (exercise.userId !== userId) {
        throw new Error('Not authorized');
      }
      return this.prisma.exercises.update({
        where: { uuid: uuid },
        data: {
          name: data.name,
          description: data.description,
          exerciseGroupId: data.exerciseGroupId,
        },
        include: {
          exerciseGroup: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to update exercise');
    }
  }

  async delete(userId: string, uuid: string): Promise<Exercises> {
    try {
      const exercise = await this.prisma.exercises.findUnique({ where: { uuid: uuid } });
      if (!exercise) {
        throw new Error('Exercise not found');
      }
      if (exercise.userId !== userId) {
        throw new Error('Not authorized');
      }
      return this.prisma.exercises.delete({
        where: { uuid: uuid },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to delete exercise');
    }
  }
}
