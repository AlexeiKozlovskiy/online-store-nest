import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'User password' })
  password: string;
}

export class LoginGoogleDto {
  @IsString()
  @ApiProperty({ description: 'User login' })
  login: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'Linct to google picture' })
  picture: string;

  @IsBoolean()
  @ApiProperty({ description: 'Login is Google' })
  isGoogle: boolean;
}
