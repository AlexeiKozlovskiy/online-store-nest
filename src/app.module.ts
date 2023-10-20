import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
