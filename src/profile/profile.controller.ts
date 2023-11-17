import { Controller, Get, Param, UseGuards, ParseUUIDPipe, Post, Body, Put } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('create')
  async createUserProfile(@Body() dto: CreateProfileDto) {
    return await this.profileService.createProfile(dto);
  }

  @Put('update')
  async updateUserProfile(@Body() dto: UpdateProfileDto) {
    const { userId } = dto;
    return await this.profileService.updateProfile(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.profileService.findProfileById(id);
  }
}
