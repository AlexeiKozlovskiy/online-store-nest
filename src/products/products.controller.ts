import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { Product } from '.././types/types';
import { ProductsService } from './products.service';
import { MessageStatus } from '../types/types';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { loadProducts } from '../helpers/helpersFunc';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsService.getProducts();
    if (!products.length) {
      throw new HttpException(MessageStatus.PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return products;
  }

  @Get(':id')
  async getProductsById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Product> {
    const product = await this.productsService.getProduct(id);
    if (!product) {
      throw new HttpException(MessageStatus.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post()
  async createProduct(@Body(ValidationPipe) dto: CreateProductDto) {
    return await this.productsService.createProduct(dto);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateProductDto,
  ) {
    const product = await this.productsService.getProduct(id);
    if (!product) {
      throw new HttpException(MessageStatus.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.productsService.updateProduct(id, dto);
    return { message: MessageStatus.PRODUCT_UPDATE_SUCCESS };
  }

  @Post('/insertAll')
  async insertProducts() {
    const productsJSON = await loadProducts('src/data/products.json');
    try {
      await this.productsService.insertProductsFromJSON(productsJSON);
      return { message: MessageStatus.PRODUCTS_INSERT_SUCCESS };
    } catch (error) {
      throw new HttpException(MessageStatus.ERROR_VALIDATION_PRODUCTS_FIELDS, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/deleteAll')
  async deleteAllProducts() {
    const products = await this.productsService.getProducts();
    if (!products.length) {
      throw new HttpException(MessageStatus.PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.productsService.deleteAllProducts();
    return { message: MessageStatus.PRODUCTS_DELETE_SUCCESS };
  }

  @Delete(':id')
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getProduct(id);
    if (!product) {
      throw new HttpException(MessageStatus.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.productsService.deleteProduct(product.id);
    return { message: MessageStatus.PRODUCT_DELETE_SUCCESS };
  }
}
