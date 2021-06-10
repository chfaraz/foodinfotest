import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { ProductController } from '@src/product/product.controller';
import { ProductService } from '@src/product/product.service';
import { productProviders } from './product.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class ProductModule {}
