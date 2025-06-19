import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: 'D.Runich', required: true })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: 'string', example: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: 'string', example: 'runich@mail.ru', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string', example: '79122536985', required: false })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ type: 'string', example: 'Dmitry', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: 'string', example: 'male || female', required: false })
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty({ type: 'string', example: '2024-11-04 13:17:03.886', required: false })
  @IsOptional()
  @IsDateString()
  birthDate: Date;
}

export class ReturnedUserDto {
  @ApiProperty({ type: 'string', example: 'D.Runich', required: true })
  login: string;

  @ApiProperty({ type: 'string', example: 'runich@mail.ru', required: false })
  email: string;

  @ApiProperty({ type: 'string', example: '79122536985', required: false })
  phone: string;

  @ApiProperty({ type: 'string', example: 'Dmitry', required: false })
  name: string;

  @ApiProperty({ type: 'string', example: 'male || female', required: false })
  gender: string;

  @ApiProperty({ type: 'string', example: '2024-11-04 13:17:03.886', required: false })
  birthDate: Date;

  // @ApiProperty({ type: 'array', example: [] })
  // workouts: CreateWorkoutDto[];

  // @ApiProperty({ type: 'array', example: [] })
  // weightData: string[];

  // @ApiProperty({ type: 'array', example: [] })
  // exerciseGroups: string[];

  // @ApiProperty({ type: 'array', example: [] })
  // exercises: string[];
}
