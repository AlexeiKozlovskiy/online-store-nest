import { Controller, Get, Param, UseGuards, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageStatus } from 'src/types/types';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: MessageStatus.UNAUTHORIZED,
  })
  @ApiOperation({ summary: 'Get auth user' })
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findById(id);
  }
}
