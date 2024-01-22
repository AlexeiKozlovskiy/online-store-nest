import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './profile.dto';
import { MessageStatus } from 'src/types/types';
import { decrypt, encrypt } from 'src/guards/crypto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    const { cvvCard, numberCard, dateCard } = dto;

    if (profile) {
      const updatedProfile = await this.prisma.profile.update({
        where: { userId },
        data: {
          ...dto,
          cvvCard: encrypt(cvvCard),
          numberCard: encrypt(numberCard),
          dateCard: encrypt(dateCard),
        },
      });
      return updatedProfile;
    } else {
      const newProfile = await this.prisma.profile.create({
        data: {
          ...dto,
          cvvCard: encrypt(cvvCard),
          numberCard: encrypt(numberCard),
          dateCard: encrypt(dateCard),
        },
      });
      return newProfile;
    }
  }

  async findProfileById(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new HttpException(MessageStatus.USER_PROFILE_IS_EMPTY, HttpStatus.NO_CONTENT);
    }
    const { cvvCard, numberCard, dateCard } = profile;
    return {
      ...profile,
      cvvCard: decrypt(cvvCard),
      numberCard: decrypt(numberCard),
      dateCard: decrypt(dateCard),
    };
  }
}
