import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Workouts, Sets } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<Workouts[]> {
    try {
      return await this.prisma.workouts.findMany({
        where: {
          userId: userId,
        },
        include: {
          sets: {
            include: {
              exercise: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to find workouts');
    }
  }

  async findOne(userId: string, uuid: string): Promise<Workouts> {
    try {
      const workout = await this.prisma.workouts.findUnique({
        where: { uuid: uuid },
        include: {
          sets: {
            include: {
              exercise: true,
            },
          },
        },
      });
      if (!workout) {
        throw new BadRequestException('Workout not found');
      }
      if (workout.userId !== userId) {
        throw new BadRequestException('Not authorized');
      }
      return workout;
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to find workout');
    }
  }

  async createWorkout(userId: string, data: Prisma.WorkoutsCreateInput & { sets?: Prisma.SetsCreateInput[] }): Promise<Workouts & { sets: Sets[] }> {
    try {
      if (!data.date) {
        data.date = new Date();
      }
      const { sets, ...workoutData } = data;
      const workout = await this.prisma.workouts.create({
        data: {
          user: {
            connect: {
              uuid: userId,
            },
          },
          ...workoutData,
          sets: {
            create: sets,
          },
        },
        include: {
          sets: true,
        },
      });

      return { ...workout, sets: workout.sets };
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to create workout');
    }
  }

  async updateWorkout(workoutId: string, userId: string, data: Prisma.WorkoutsUpdateInput & { sets?: Prisma.SetsUncheckedUpdateInput[] }): Promise<Workouts> {
    console.log('updateWorkout.data: ', data);

    try {
      const workout = await this.prisma.workouts.findUnique({
        where: { uuid: workoutId },
        include: { sets: true },
      });

      if (!workout || workout.userId !== userId) {
        throw new Error('Нет прав на редактирование этой тренировки');
      }

      const { sets, ...rawWorkoutData } = data;

      // Очистка входных данных — оставляем только date, name, description
      const sanitizedData: Prisma.WorkoutsUpdateInput = {};
      if (rawWorkoutData.date instanceof Date) {
        sanitizedData.date = rawWorkoutData.date;
      }
      if (typeof rawWorkoutData.name === 'string') {
        sanitizedData.name = rawWorkoutData.name;
      }
      if (typeof rawWorkoutData.description === 'string') {
        sanitizedData.description = rawWorkoutData.description;
      }
      if (rawWorkoutData.duration) {
        sanitizedData.duration = rawWorkoutData.duration;
      }
      if (rawWorkoutData.calories) {
        sanitizedData.calories = rawWorkoutData.calories;
      }

      // Обновляем тренировку
      await this.prisma.workouts.update({
        where: {
          uuid: workoutId,
        },
        data: sanitizedData,
      });

      // Update the sets
      if (sets) {
        // Delete all existing sets
        await this.prisma.sets.deleteMany({
          where: {
            workoutId: workout.uuid,
          },
        });

        // Create new sets
        await this.prisma.sets.createMany({
          data: sets.map((set) => ({
            workoutId: workout.uuid,
            exerciseId: set.exerciseId as string,
            counts: set.counts,
          })),
        });
      }

      return this.prisma.workouts.findUnique({
        where: {
          uuid: workoutId,
        },
        include: {
          sets: {
            include: {
              exercise: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to update workout');
    }
  }

  async deleteWorkout(workoutId: string, userId: string): Promise<Workouts> {
    try {
      const workout = await this.prisma.workouts.findUnique({
        where: { uuid: workoutId },
      });

      if (!workout || workout.userId !== userId) {
        throw new Error('Нет прав на удаление этой тренировки');
      }
      await this.prisma.sets.deleteMany({
        where: {
          workoutId: workoutId,
        },
      });
      return this.prisma.workouts.delete({
        where: {
          uuid: workoutId,
        },
        include: {
          sets: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to delete workout');
    }
  }
}
