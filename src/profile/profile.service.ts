import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './products.dto';
import { MessageStatus } from 'src/types/types';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(dto: CreateProfileDto) {
    const newProfile = await this.prisma.profile.create({
      data: {
        ...dto,
      },
    });
    return newProfile;
  }

  async findProfileById(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new HttpException(MessageStatus.USER_PROFILE_IS_EMPTY, HttpStatus.NOT_FOUND);
    }
    return profile;
  }
}
