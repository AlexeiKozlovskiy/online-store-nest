import { Injectable } from '@nestjs/common';
import { Product } from '../types/types';
import { DBService } from '../db/db';

@Injectable()
export class ProductsService {
  constructor(private DB: DBService) {}

  async getProducts(): Promise<Product[]> {
    return await this.DB.getProductsDB();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.DB.getProductById(id);
  }
}
