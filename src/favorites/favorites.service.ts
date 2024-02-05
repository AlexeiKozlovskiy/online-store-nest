import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFavoritesDto } from './favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(userId: string) {
    return await this.userFavorites(userId);
  }

  async addToFavorites({ favorite }: UpdateFavoritesDto, userId: string) {
    const existingFavorites = await this.userFavorites(userId);
    const { favorites } = existingFavorites;
    const alreadyFavorites = this.isAlreadyFavorites(favorites, favorite);

    if (!existingFavorites) {
      return await this.prisma.favorites.create({
        data: { userId, favorites: [favorite] },
      });
    } else if (!alreadyFavorites) {
      const updatedFavorites = await this.prisma.favorites.update({
        where: { userId },
        data: { favorites: [...favorites, favorite] },
      });
      return updatedFavorites;
    }
  }

  async deleteFavorite({ favorite }: UpdateFavoritesDto, userId: string) {
    const existingFavorites = await this.userFavorites(userId);
    const { favorites } = existingFavorites;

    const deleteArr = favorites.filter((el) => el !== favorite);

    const updatedFavorites = await this.prisma.favorites.update({
      where: { userId },
      data: { favorites: [...deleteArr] },
    });
    return updatedFavorites;
  }

  private async userFavorites(userId: string) {
    const favorites = await this.prisma.favorites.findUnique({
      where: { userId },
    });
    return favorites;
  }

  private isAlreadyFavorites(arr: string[], value: string) {
    return arr.some((el) => el === value);
  }
}
