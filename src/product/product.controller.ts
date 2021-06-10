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
import { UpdateProductDto } from './dto/updateProduct.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  async searchProduct(@Query('search') search: string): Promise<Product[]> {
    return this.productService.search(search);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/deleted')
  async getDeleted(): Promise<Product[]> {
    return this.productService.getDeleted();
  }

  @UseGuards(JwtAuthGuard)
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
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<string> {
    return this.productService.updateProduct(updateProductDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    console.log(id);

    return this.productService.getProductById(id);
  }
}
