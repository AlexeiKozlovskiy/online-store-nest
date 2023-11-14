import { Controller, Get, Param, UseGuards, ParseUUIDPipe, Post, Body } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './products.dto';

@Controller('profile')
export class ProfileController {
  constructor(private userService: ProfileService) {}

  @Post()
  async createUserProfile(@Body() dto: CreateProfileDto) {
    return await this.userService.createProfile(dto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findProfileById(id);
  }
}
