import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { omitHiddenProps, Entities } from '../utils/omit-hidden-props';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async user(UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Partial<Users> | null> {
    const user = await this.prisma.users.findUnique({
      where: UsersWhereUniqueInput,
    });
    return user ? omitHiddenProps(user, Entities.Users) : null;
  }

  async getMyUser(userId: string): Promise<Partial<Users>> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { uuid: userId },
        // include: {
        //   weightData: {
        //     orderBy: {
        //       date: 'desc',
        //     },
        //   },
        //   workouts: {
        //     orderBy: {
        //       date: 'desc',
        //     },
        //   },
        //   exercises: true,
        //   exerciseGroups: {
        //     orderBy: {
        //       createdAt: 'desc',
        //     },
        //     include: {
        //       exercises: true,
        //     },
        //   },
        // },
      });
      return user ? omitHiddenProps(user, Entities.Users) : null;
    } catch (error) {
      throw new BadRequestException(error?.message?.split('\n').pop() || 'Failed to get user');
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<Partial<Users>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return users.map((user) => omitHiddenProps(user, Entities.Users));
  }

  async updateUser(params: { where: Prisma.UsersWhereUniqueInput; data: Prisma.UsersUpdateInput }): Promise<Partial<Users>> {
    const { where, data } = params;
    const { name } = data; // будем ограничивать поля, которые можно менять
    if (!name) {
      throw new BadRequestException('Имя не может быть пустым');
    }
    const user = await this.prisma.users.update({
      data: { name },
      where,
    });
    return omitHiddenProps(user, Entities.Users);
  }

  async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Partial<Users>> {
    const user = await this.prisma.users.delete({
      where,
    });
    return omitHiddenProps(user, Entities.Users);
  }

  async registerUser(data: Prisma.UsersCreateInput): Promise<Partial<Users>> {
    if (!data.login) {
      throw new BadRequestException('Логин не может быть пустым');
    }
    if (!data.password) {
      throw new BadRequestException('Пароль не может быть пустым');
    }
    const existingUserByLogin = await this.prisma.users.findUnique({
      where: { login: data.login },
    });
    if (existingUserByLogin) {
      throw new ConflictException('Пользователь с таким логином уже существует');
    }
    // Проверка уникальности email
    if (data.email) {
      const existingUserByEmail = await this.prisma.users.findUnique({
        where: { email: data.email },
      });
      if (existingUserByEmail) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }
    }
    // Проверка уникальности телефона
    if (data.phone) {
      const existingUserByPhone = await this.prisma.users.findUnique({
        where: { phone: data.phone },
      });
      if (existingUserByPhone) {
        throw new ConflictException('Пользователь с таким номером телефона уже существует');
      }
    }
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Создание пользователя с хешированным паролем
    const user = await this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
        scopes: ['user'], // Устанавливаем базовую роль для нового пользователя
      },
    });
    return omitHiddenProps(user, Entities.Users);
  }
  async validateUser(login: string, password: string): Promise<Partial<Users> | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        login,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return omitHiddenProps(user, Entities.Users);
    }
    return null;
  }

  async login(user: Partial<Users>) {
    const sessionId = uuidv4();
    await this.prisma.users.update({
      where: { uuid: user.uuid },
      data: { sessionId },
    });

    const payload = { sub: user.uuid, email: user.email, sessionId };
    const secret = this.configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new UnauthorizedException('JWT_SECRET не установлен');
    }

    try {
      const token = this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: '1y', // 1 год
      });
      return {
        access_token: token,
      };
    } catch (error) {
      console.error('Ошибка при подписании токена:', error);
      throw new UnauthorizedException('Не удалось создать токен');
    }
  }

  async logout(userId: string) {
    await this.prisma.users.update({
      where: { uuid: userId },
      data: { sessionId: null },
    });
  }
}
