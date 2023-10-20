import { Injectable, Module, Global } from '@nestjs/common';
import { Product } from '../types/types';
import { createReadStream } from 'fs';

@Injectable()
export class DBService {
  private products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  private async loadProducts() {
    const stream = createReadStream('src/data/products.json', 'utf-8');
    let data = '';
    stream.on('data', (chunk) => (data += chunk));
    stream.on('end', () => {
      this.products = JSON.parse(data);
    });
  }

  async getProductsDB(): Promise<Product[]> {
    return this.products;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.id === +id);
  }
}

@Global()
@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
