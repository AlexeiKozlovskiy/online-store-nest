import { Controller, Get, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findById(id);
  }
}
