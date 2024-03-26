import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Body,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './profile.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageStatus } from 'src/types/types';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Put('update')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateProfileDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MessageStatus.REQUIRED_FIELDS_ERR,
  })
  @ApiOperation({ summary: 'Update user profile' })
  async updateUserProfile(@Body() dto: UpdateProfileDto) {
    const { userId } = dto;
    return await this.profileService.updateProfile(userId, dto);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: UpdateProfileDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: MessageStatus.USER_PROFILE_IS_EMPTY,
  })
  @ApiOperation({ summary: 'Get user profile' })
  async getUserProfile(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.profileService.findProfileById(id);
  }
}
