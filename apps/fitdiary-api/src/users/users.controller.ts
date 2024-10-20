import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConflictException, BadRequestException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, Users } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() data: Prisma.UsersCreateInput) {
    try {
      return await this.usersService.registerUser(data);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Не удалось зарегистрировать пользователя');
    }
  }

  @Get('me')
  me(@Req() req: Request & { user: Users }) {
    return this.usersService.getMyUser(req.user.uuid);
  }

  @Patch('me')
  updateMe(@Req() req: Request & { user: Users }, @Body() data: Prisma.UsersUpdateInput) {
    return this.usersService.updateUser({ where: { uuid: req.user.uuid }, data });
  }

  @Get()
  findAll(@Query() query: Prisma.UsersWhereInput) {
    return this.usersService.users({ where: query });
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.user({ uuid });
  }

  @Patch(':id')
  update(@Param('uuid') uuid: string, @Body() data: Prisma.UsersUpdateInput) {
    return this.usersService.updateUser({ where: { uuid }, data });
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.deleteUser({ uuid });
  }
}
