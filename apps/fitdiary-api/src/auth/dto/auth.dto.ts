import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: 'string', example: 'D.Runich', required: true })
  login: string;

  @ApiProperty({ type: 'string', example: 'password', required: true })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: 'string', example: 'hashed_token', required: true })
  access_token: string;
}
