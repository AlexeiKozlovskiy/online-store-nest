import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'User login' })
  login: string;

  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'User password' })
  password: string;
}

export class CreateGoogleUserDto {
  @IsString()
  @ApiProperty({ description: 'User login' })
  login: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'Google picture' })
  picture: string;

  @IsBoolean()
  @ApiProperty({ description: 'Login is Google' })
  isGoogle: boolean;
}
