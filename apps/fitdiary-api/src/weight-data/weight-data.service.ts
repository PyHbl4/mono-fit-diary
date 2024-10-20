import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WeightDataService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string, orderBy?: string, order?: 'ASC' | 'DESC') {
    const validFields = ['date', 'weight']; // допустимые поля для сортировки
    const orderByField = validFields.includes(orderBy) ? orderBy : 'date';
    const orderDirection = order?.toLowerCase() === 'asc' ? 'asc' : 'desc';

    return this.prisma.weightData.findMany({
      where: { userId },
      orderBy: { [orderByField]: orderDirection },
    });
  }

  async create(userId: string, data: Omit<Prisma.WeightDataCreateInput, 'user'>) {
    return this.prisma.weightData.create({
      data: {
        ...data,
        userId: userId,
      },
    });
  }

  async delete(userId: string, id: string) {
    return this.prisma.weightData.delete({ where: { uuid: id, userId } });
  }

  async update(id: string, data: Prisma.WeightDataUpdateInput) {
    return this.prisma.weightData.update({ where: { uuid: id }, data });
  }
}
