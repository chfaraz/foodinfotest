import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  @Get('/search/:status')
  async searchProduct(
    @Query('search') search: string,
    @Param('status') status: string,
  ): Promise<Product[]> {
    return this.productService.search(search, status);
  }

  @Get('/title/:status')
  async searchTitle(
    @Query('search') search: string,
    @Param('status') status: string,
  ): Promise<Product[]> {
    return this.productService.searchTitle(search, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status/:status')
  async getProducts(@Param('status') status: string): Promise<Product[]> {
    return this.productService.getProducts(status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deletePermanent(@Param('id') id: string): Promise<string> {
    console.log('==================>>>>>>>>>>>>>>>>>>');

    return this.productService.deletePermanent(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteProductById(@Param('id') id: string): Promise<string> {
    console.log('=======================>>>>>>>>>', id);

    return this.productService.delete(id);
  }
  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    console.log(id);

    return this.productService.getProductById(id);
  }

  @Get('/')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.addProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() { ...product },
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }
}
