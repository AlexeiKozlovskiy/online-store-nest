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
import { createReadStream } from 'fs';
import { MessageStatus } from '../types/types';
import { CreateProductDTO, UpdateProductDTO } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
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
  async createProduct(@Body(ValidationPipe) dto: CreateProductDTO) {
    await this.productsService.createProduct(dto);
    return { message: MessageStatus.PRODUCT_CREATE_SUCCESS };
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateProductDTO,
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
    async function loadProducts() {
      try {
        const stream = createReadStream('src/data/products.json', 'utf-8');
        let data = '';
        for await (const chunk of stream) data += chunk;
        return JSON.parse(data);
      } catch (error) {
        throw new Error(MessageStatus.ERROR_JSON);
      }
    }
    const productsJSON = await loadProducts();
    await this.productsService.insertProductsFromJSON(productsJSON);
    return { message: MessageStatus.PRODUCTS_INSERT_SUCCESS };
  }

  @Delete('/deleteAll')
  async deleteAllProducts() {
    await this.productsService.deleteAllProducts();
    return { message: MessageStatus.PRODUCTS_DELETE_SUCCESS };
  }

  @Delete(':id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getProduct(id);
    if (!product) {
      throw new HttpException(MessageStatus.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.productsService.deleteProduct(product.id);
    return { message: MessageStatus.PRODUCT_DELETE_SUCCESS };
  }
}
