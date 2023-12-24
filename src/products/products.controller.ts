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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: MessageStatus.SUCCESS })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MessageStatus.PRODUCTS_NOT_FOUND })
  @ApiOperation({ summary: 'Get all list products' })
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsService.getProducts();
    if (!products.length) {
      throw new HttpException(MessageStatus.PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return products;
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: MessageStatus.SUCCESS })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MessageStatus.PRODUCT_NOT_FOUND })
  @ApiParam({ name: 'id', required: true, description: 'Product identifier' })
  @ApiOperation({ summary: 'Get single product by id' })
  async getProductsById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Product> {
    const product = await this.productsService.getProduct(id);
    if (!product) {
      throw new HttpException(MessageStatus.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MessageStatus.PRODUCT_CREATE_SUCCESS,
    type: CreateProductDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: MessageStatus.REQUIRED_FIELDS_ERR })
  @ApiOperation({ summary: 'Create new product' })
  async createProduct(@Body(ValidationPipe) dto: CreateProductDto) {
    return await this.productsService.createProduct(dto);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: MessageStatus.PRODUCT_UPDATE_SUCCESS,
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${MessageStatus.REQUIRED_FIELDS_ERR}, or id is invalid (not uuid)`,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MessageStatus.PRODUCTS_NOT_FOUND })
  @ApiParam({ name: 'id', required: true, description: 'Product identifier' })
  @ApiOperation({ summary: 'Update products info' })
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
  @ApiResponse({ status: HttpStatus.OK, description: MessageStatus.PRODUCTS_INSERT_SUCCESS })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${MessageStatus.ERROR_VALIDATION_PRODUCTS_FIELDS}. ${MessageStatus.REQUIRED_FIELDS_ERR}`,
  })
  @ApiOperation({ summary: 'Create new products, from a .json file with a list of products' })
  async insertProducts() {
    const productsJSON = await loadProducts('src/data/products.json');
    try {
      await this.productsService.insertProductsFromJSON(productsJSON);
      return { message: MessageStatus.PRODUCTS_INSERT_SUCCESS };
    } catch (error) {
      throw new HttpException(
        MessageStatus.ERROR_VALIDATION_PRODUCTS_FIELDS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/deleteAll')
  @ApiResponse({ status: HttpStatus.OK, description: MessageStatus.PRODUCTS_DELETE_SUCCESS })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MessageStatus.PRODUCTS_NOT_FOUND })
  @ApiOperation({ summary: 'Delete all products' })
  async deleteAllProducts() {
    const products = await this.productsService.getProducts();
    if (!products.length) {
      throw new HttpException(MessageStatus.PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.productsService.deleteAllProducts();
    return { message: MessageStatus.PRODUCTS_DELETE_SUCCESS };
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: MessageStatus.PRODUCT_DELETE_SUCCESS })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'ID is invalid (not uuid)' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MessageStatus.PRODUCT_NOT_FOUND })
  @ApiParam({ name: 'id', required: true, description: 'Product identifier' })
  @ApiOperation({ summary: 'Delete product by id' })
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getProduct(id);
    if (!product) {
      throw new HttpException(MessageStatus.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.productsService.deleteProduct(product.id);
    return { message: MessageStatus.PRODUCT_DELETE_SUCCESS };
  }
}
