import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.prisma.users.findUnique({
        where: { uuid: decoded.sub },
      });

      if (!user || user.sessionId !== decoded.sessionId) {
        throw new UnauthorizedException('Недействительная сессия');
      }

      return decoded;
    } catch (error) {
      console.error('Ошибка при проверке токена:', error);
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
