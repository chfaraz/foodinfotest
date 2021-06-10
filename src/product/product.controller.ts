import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { CreateProductDto } from '@src/product/dto/product.dto';
import { Product } from '@src/product/product.entity';
import { ProductService } from '@src/product/product.service';
import { diskStorage } from 'multer';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') +
        new Date().getMilliseconds();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/search')
  async searchProduct(@Query('search') search: string): Promise<Product[]> {
    return this.productService.search(search);
  }

  @Get('/deleted')
  async getDeleted(): Promise<Product[]> {
    return this.productService.getDeleted();
  }

  @Delete('/:id')
  async deleteProductById(@Param('id') id: string): Promise<string> {
    console.log('=======================>>>>>>>>>', id);

    return this.productService.delete(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post('/')
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.addProduct(createProductDto);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    console.log(id);

    return this.productService.getProductById(id);
  }
}
