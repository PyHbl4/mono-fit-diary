import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConflictException, BadRequestException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, Users } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, ReturnedUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token', example: 'Bearer token' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: ReturnedUserDto })
  async register(@Body() data: Prisma.UsersCreateInput) {
    try {
      return await this.usersService.registerUser(data);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error);
      throw new BadRequestException('Не удалось зарегистрировать пользователя');
    }
  }

  @ApiBearerAuth()
  @Get('me')
  @ApiResponse({ status: 200, type: ReturnedUserDto })
  me(@Req() req: Request & { user: Users }) {
    return this.usersService.getMyUser(req.user.uuid);
  }

  @ApiBearerAuth()
  @Patch('me')
  @ApiResponse({ status: 200, type: ReturnedUserDto })
  updateMe(@Req() req: Request & { user: Users }, @Body() data: Prisma.UsersUpdateInput) {
    return this.usersService.updateUser({ where: { uuid: req.user.uuid }, data });
  }

  @ApiBearerAuth()
  @Get()
  @ApiExcludeEndpoint()
  findAll(@Query() query: Prisma.UsersWhereInput) {
    return this.usersService.users({ where: query });
  }

  @ApiBearerAuth()
  @Get(':uuid')
  @ApiExcludeEndpoint()
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.user({ uuid });
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('uuid') uuid: string, @Body() data: Prisma.UsersUpdateInput) {
    return this.usersService.updateUser({ where: { uuid }, data });
  }

  @ApiBearerAuth()
  @Delete(':uuid')
  @ApiExcludeEndpoint()
  remove(@Param('uuid') uuid: string) {
    return this.usersService.deleteUser({ uuid });
  }
}
