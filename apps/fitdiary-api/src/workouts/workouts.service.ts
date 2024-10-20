import { Injectable } from '@nestjs/common';
import { Prisma, Workouts, Sets } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<Workouts[]> {
    return this.prisma.workouts.findMany({
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
  }

  async createWorkout(userId: string, data: Prisma.WorkoutsCreateInput & { sets: Prisma.SetsCreateInput[] }): Promise<Workouts & { sets: Sets[] }> {
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
  }

  async updateWorkout(workoutId: string, userId: string, data: Prisma.WorkoutsUpdateInput & { sets?: Prisma.SetsCreateInput[] }): Promise<Workouts> {
    const workout = await this.prisma.workouts.findUnique({
      where: { uuid: workoutId },
      include: { sets: true },
    });

    if (!workout || workout.userId !== userId) {
      throw new Error('Нет прав на редактирование этой тренировки');
    }

    const { sets, ...workoutData } = data;

    return this.prisma.workouts.update({
      where: {
        uuid: workoutId,
      },
      data: {
        ...workoutData,
        sets: sets
          ? {
              deleteMany: {},
              create: sets.map((set) => ({
                ...set,
                exercise: {
                  connect: { uuid: set.exercise as string },
                },
              })),
            }
          : undefined,
      },
      include: {
        sets: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  async deleteWorkout(workoutId: string, userId: string): Promise<Workouts> {
    const workout = await this.prisma.workouts.findUnique({
      where: { uuid: workoutId },
    });

    if (!workout || workout.userId !== userId) {
      throw new Error('Нет прав на удаление этой тренировки');
    }
    return this.prisma.workouts.delete({
      where: {
        uuid: workoutId,
      },
      include: {
        sets: true,
      },
    });
  }
}
