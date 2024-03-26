import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [FavoritesService, PrismaService, JwtService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
