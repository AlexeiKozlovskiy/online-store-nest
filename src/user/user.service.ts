import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, CreateGoogleUserDto } from './user.dto';
import { hash } from 'bcrypt';
import { MessageStatus } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException(MessageStatus.THISE_EMAIL_IS_ALREADY_REDISTRED);

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    const { password, ...result } = newUser;
    return result;
  }

  async createGoogleUser(dto: CreateGoogleUserDto) {
    const user = await this.prisma.user.create({
      data: { ...dto },
    });
    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
