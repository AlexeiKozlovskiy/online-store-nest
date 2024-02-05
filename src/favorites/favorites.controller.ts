import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Body,
  Delete,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UpdateFavoritesDto } from './favorites.dto';
import { MessageStatus } from 'src/types/types';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get(':id')
  async getAllFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.getFavorites(id);
  }

  @Post(':id')
  async addFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateFavoritesDto,
  ) {
    await this.favoritesService.addToFavorites(dto, id);
    return { message: MessageStatus.FAVORITE_PRODUCT_CREATE_SUCCESS };
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateFavoritesDto,
  ) {
    await this.favoritesService.deleteFavorite(dto, id);
    return { message: MessageStatus.FAVORITE_PRODUCT_DELETE_SUCCESS };
  }
}
