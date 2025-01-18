import { Controller, Post, Body, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() data: { login: string; password: string }) {
    const user = await this.usersService.validateUser(data.login, data.password);
    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }
    return this.usersService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Request() req) {
    await this.usersService.logout(req.user.sub);
    return { message: 'Успешно разлогинились' };
  }
}
