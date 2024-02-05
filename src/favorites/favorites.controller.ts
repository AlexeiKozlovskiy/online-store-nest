import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Body,
  Delete,
  Post,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesDto } from './favorites.dto';
import { MessageStatus } from 'src/types/types';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('favorites')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: MessageStatus.SUCCESS })
  @ApiParam({ name: 'id', required: true, description: 'User id' })
  @ApiOperation({ summary: 'Get favorites products' })
  async getAllFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.getFavorites(id);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Create new favorite product' })
  @ApiParam({ name: 'id', required: true, description: 'User id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MessageStatus.FAVORITE_PRODUCT_CREATE_SUCCESS,
    type: FavoritesDto,
  })
  async addFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: FavoritesDto,
  ) {
    await this.favoritesService.addToFavorites(dto, id);
    return { message: MessageStatus.FAVORITE_PRODUCT_CREATE_SUCCESS };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete favorite product' })
  @ApiParam({ name: 'id', required: true, description: 'User id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MessageStatus.FAVORITE_PRODUCT_DELETE_SUCCESS,
    type: FavoritesDto,
  })
  async deleteProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: FavoritesDto,
  ) {
    await this.favoritesService.deleteFavorite(dto, id);
    return { message: MessageStatus.FAVORITE_PRODUCT_DELETE_SUCCESS };
  }
}
