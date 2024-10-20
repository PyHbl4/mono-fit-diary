import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service'; // Предполагается, что у вас есть сервис для работы с пользователями

@Injectable()
export class WithAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Предполагается, что токен передается в формате "Bearer <token>"

      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        const payload = await this.jwtService.verifyAsync(token, { secret });
        const user = await this.usersService.user({ uuid: payload.sub });

        if (!user) {
          throw new UnauthorizedException('Пользователь не найден');
        }

        // Добавляем пользователя в объект запроса
        req['user'] = user;
      } catch (error) {
        console.error(error);
        throw new UnauthorizedException('Недействительный токен');
      }
    }

    next();
  }
}
