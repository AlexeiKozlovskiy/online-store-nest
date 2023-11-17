import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { MessageStatus } from 'src/types/types';
import { decrypt, encrypt } from 'src/guards/crypto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(dto: CreateProfileDto) {
    const { cvvCard, numberCard, dateCard } = dto;
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

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const { cvvCard, numberCard, dateCard } = dto;
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
  }

  async findProfileById(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new HttpException(MessageStatus.USER_PROFILE_IS_EMPTY, HttpStatus.NOT_FOUND);
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
