import { Injectable } from '@nestjs/common';
import { Exercises, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<Exercises[]> {
    return this.prisma.exercises.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async create(userId: string, data: Prisma.ExercisesCreateInput): Promise<Exercises> {
    const exercise = await this.prisma.exercises.create({
      data: {
        ...data,
        user: {
          connect: { uuid: userId },
        },
      },
    });
    return exercise;
  }

  async update(uuid: string, data: Prisma.ExercisesUpdateInput): Promise<Exercises> {
    return this.prisma.exercises.update({
      where: { uuid: uuid },
      data: data,
    });
  }

  async delete(uuid: string): Promise<Exercises> {
    return this.prisma.exercises.delete({
      where: { uuid: uuid },
    });
  }
}
