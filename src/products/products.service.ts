import { Injectable } from '@nestjs/common';
import { Product } from '../types/types';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDTO, UpdateProductDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(dto: CreateProductDTO): Promise<Product> {
    return this.prisma.product.create({
      data: { ...dto },
    });
  }

  async updateProduct(id: string, dto: UpdateProductDTO): Promise<Product> {
    const updatedTrack = await this.prisma.product.update({
      where: { id },
      data: { ...dto },
    });
    return updatedTrack;
  }

  async insertProductsFromJSON(jsonData: Prisma.JsonArray) {
    const productsToInsert: Prisma.ProductCreateManyInput[] = (
      jsonData as unknown as Product[]
    ).map(({ name, stock, collection, price, color, size, favorite, category, images }) => ({
      name,
      stock,
      collection,
      price,
      color,
      size,
      favorite,
      category,
      images: { set: images },
    }));

    return await this.prisma.product.createMany({
      data: productsToInsert,
    });
  }

  async deleteProduct(id: string) {
    await this.prisma.product.delete({ where: { id } });
  }

  async deleteAllProducts() {
    return await this.prisma.product.deleteMany();
  }
}
