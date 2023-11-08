import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, LoginGoogleDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserServise } from 'src/types/types';

const EXPIRE_TIME = 3500 * 1000;

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  private async generateTokens(payload: any) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const { email, login } = user;
    const payload = {
      email,
      sub: { login },
    };
    const backendTokens = await this.generateTokens(payload);

    return { user, backendTokens };
  }

  async loginGoogle(dto: LoginGoogleDto) {
    const user = await this.validateGoogleUser(dto);
    const { email, login, picture, isGoogle } = user;

    const payload = {
      email,
      sub: { login, picture, isGoogle },
    };

    const backendTokens = await this.generateTokens(payload);

    return { user, backendTokens };
  }

  async validateGoogleUser(dto: LoginGoogleDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user) {
      return user;
    } else {
      const newUser = await this.userService.createGoogleUser(dto);
      return newUser;
    }
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(user: UserServise) {
    const payload = {
      email: user.email,
      sub: user.sub,
    };

    const backendTokens = await this.generateTokens(payload);

    return { backendTokens };
  }
}
