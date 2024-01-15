import { Injectable } from '@nestjs/common';
import { Product, QweryProduct } from '../types/types';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto, ListAllQwerys, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async getProductsByQwery(stringQwery: ListAllQwerys): Promise<Product[]> {
    const allProducts = await this.prisma.product.findMany();
    const qwery = this.getTransformQwery(stringQwery);
    const filtredProducts = this.getFiltredProducts(allProducts, qwery);
    return filtredProducts;
  }

  async getProduct(id: string): Promise<Product> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: { ...dto },
    });
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
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

  private getTransformQwery(qwery: ListAllQwerys): Partial<QweryProduct> {
    const transformQwery = {};
    for (const key in qwery) {
      transformQwery[key] = qwery[key].split(',');
    }
    return transformQwery;
  }

  private getFiltredProducts(allProducts: Product[], qwery: Partial<QweryProduct>) {
    const {
      colors,
      collections,
      categories,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      minStock,
      maxStock,
      q: search,
    } = qwery;

    return allProducts.filter(({ name, color, collection, category, price, size, stock }) => {
      const colorCheck = !colors || colors.includes(color);
      const collectionCheck = !collections || collections.includes(collection.toString());
      const categoryCheck = !categories || categories.includes(category);
      const minPriceCheck = !minPrice || price >= +minPrice;
      const maxPriceCheck = !maxPrice || price <= +maxPrice;
      const minSizeCheck = !minSize || size >= +minSize;
      const maxSizeCheck = !maxSize || size <= +maxSize;
      const minStockCheck = !minStock || stock >= +minStock;
      const maxStockCheck = !maxStock || stock <= +maxStock;
      const searchCheck = !search || name.toLowerCase().includes(search.join('').toLowerCase());

      return (
        colorCheck &&
        collectionCheck &&
        categoryCheck &&
        minPriceCheck &&
        maxPriceCheck &&
        minSizeCheck &&
        maxSizeCheck &&
        minStockCheck &&
        maxStockCheck &&
        searchCheck
      );
    });
  }
}
