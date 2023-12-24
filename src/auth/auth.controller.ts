import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto, LoginGoogleDto } from './auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from 'src/guards/refresh.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageStatus } from 'src/types/types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: HttpStatus.OK, type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: MessageStatus.THISE_EMAIL_IS_ALREADY_REDISTRED,
  })
  @ApiOperation({ summary: 'User registration' })
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, type: LoginDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: MessageStatus.UNAUTHORIZED,
  })
  @ApiOperation({ summary: 'User login' })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('login/google')
  @ApiResponse({ status: HttpStatus.OK, type: LoginGoogleDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: MessageStatus.UNAUTHORIZED,
  })
  @ApiOperation({ summary: 'User login google' })
  async loginGoogle(@Body() dto: LoginGoogleDto) {
    return await this.authService.loginGoogle(dto);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: MessageStatus.UNAUTHORIZED,
  })
  @ApiOperation({ summary: 'Refresh tokens' })
  async refreshToken(@Request() req) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }
}
