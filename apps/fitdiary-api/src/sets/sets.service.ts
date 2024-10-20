import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SetsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.SetsCreateInput) {
    return this.prisma.sets.create({
      data: data,
    });
  }

  // findAllByWorkout(workoutId: string) {
  //   return this.prisma.sets.findMany({
  //     where: {
  //       workoutId: workoutId,
  //     },
  //   });
  // }

  update(uuid: string, data: Prisma.SetsUpdateInput) {
    return this.prisma.sets.update({
      where: { uuid: uuid },
      data: data,
    });
  }

  remove(uuid: string) {
    return this.prisma.sets.delete({
      where: { uuid: uuid },
    });
  }
}
