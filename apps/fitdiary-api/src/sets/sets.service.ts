import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SetsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SetsCreateInput) {
    try {
      return await this.prisma.sets.create({
        data: data,
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to create set');
    }
  }

  async update(uuid: string, data: Prisma.SetsUpdateInput) {
    try {
      return this.prisma.sets.update({
        where: { uuid: uuid },
        data: data,
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to update set');
    }
  }

  async remove(uuid: string) {
    try {
      return this.prisma.sets.delete({
        where: { uuid: uuid },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to delete set');
    }
  }
}
