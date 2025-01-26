import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WeightDataService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string, orderBy?: string, order?: 'ASC' | 'DESC') {
    try {
      const validFields = ['date', 'weight']; // допустимые поля для сортировки
      const orderByField = validFields.includes(orderBy) ? orderBy : 'date';
      const orderDirection = order?.toLowerCase() === 'asc' ? 'asc' : 'desc';

      return await this.prisma.weightData.findMany({
        where: { userId },
        orderBy: { [orderByField]: orderDirection },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to find weight data');
    }
  }

  async create(userId: string, data: Omit<Prisma.WeightDataCreateInput, 'user'>) {
    try {
      return await this.prisma.weightData.create({
        data: {
          ...data,
          userId: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to create weight data');
    }
  }

  async delete(userId: string, id: string) {
    try {
      return await this.prisma.weightData.delete({ where: { uuid: id, userId } });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to delete weight data');
    }
  }

  async update(id: string, data: Prisma.WeightDataUpdateInput) {
    try {
      return await this.prisma.weightData.update({ where: { uuid: id }, data });
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to update weight data');
    }
  }
}
