import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ExerciseGroups, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExGroupsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: Prisma.ExerciseGroupsCreateInput): Promise<ExerciseGroups> {
    try {
      const exGroup = await this.prisma.exerciseGroups.create({
        data: {
          ...data,
          user: {
            connect: { uuid: userId },
          },
        },
      });
      return exGroup;
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to create exercise group');
    }
  }

  async findAllByUser(userId: string): Promise<ExerciseGroups[]> {
    try {
      return await this.prisma.exerciseGroups.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to find exercise groups');
    }
  }

  async findOne(userId: string, uuid: string) {
    try {
      const exGroup = await this.prisma.exerciseGroups.findUnique({ where: { uuid: uuid } });
      if (!exGroup) {
        throw new NotFoundException('ExGroup not found');
      }
      if (exGroup.userId !== userId) {
        throw new UnauthorizedException('Not authorized');
      }
      return exGroup;
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to find exercise group');
    }
  }

  async update(userId: string, uuid: string, data: Prisma.ExerciseGroupsUpdateInput) {
    try {
      const exGroup = await this.prisma.exerciseGroups.findUnique({ where: { uuid: uuid } });
      if (!exGroup) {
        throw new NotFoundException('ExGroup not found');
      }
      if (exGroup.userId !== userId) {
        throw new UnauthorizedException('Not authorized');
      }
      return await this.prisma.exerciseGroups.update({
        where: { uuid: uuid },
        data: data,
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to update exercise group');
    }
  }

  async delete(userId: string, uuid: string) {
    try {
      const exGroup = await this.prisma.exerciseGroups.findUnique({ where: { uuid: uuid } });
      if (!exGroup) {
        throw new NotFoundException('ExGroup not found');
      }
      if (exGroup.userId !== userId) {
        throw new UnauthorizedException('Not authorized');
      }
      return await this.prisma.exerciseGroups.delete({ where: { uuid: uuid } });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to delete exercise group');
    }
  }
}
