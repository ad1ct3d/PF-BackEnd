import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { IsPasswordValid } from '../validators/password.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({ default: 'Guts' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  @ApiProperty({ default: 'dd/mm/aaaa' })
  readonly birthdate: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'guts@mail.com' })
  readonly email: string;

  @IsPasswordValid()
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @ApiProperty({ default: 'dragonslayer' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({ default: 'Midland' })
  readonly address: string;

  @IsNotEmpty()
  @ApiProperty({ default: 123456789 })
  readonly phone: number;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @ApiProperty({ default: 'Midland' })
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @ApiProperty({ default: 'Wyndham' })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'admin' })
  readonly role: string;

  @IsString()
  readonly order?: [];
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: number;
  country?: string;
  city?: string;
  order: [];
}
