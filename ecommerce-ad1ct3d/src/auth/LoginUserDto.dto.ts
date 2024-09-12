import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'guts@mail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'dragonslayer' })
  password: string;
}
