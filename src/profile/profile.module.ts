import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProfileService, PrismaService, JwtService],
  controllers: [ProfileController],
})
export class ProfileModule {}
