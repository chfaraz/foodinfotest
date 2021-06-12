import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '@src/product/dto/product.dto';
import { Product } from '@src/product/product.entity';
import { ProductRepository } from '@src/product/product.repository';
import { Brackets, Like } from 'typeorm';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { statusEnum } from './status.enum';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ status: statusEnum.ACTIVE });
  }

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    try {
      await this.productRepository.save(product);
    } catch (err) {
      throw new NotFoundException('failed...');
    }
    return product;
  }

  async getProductById(id: string): Promise<Product> {
    const found = await this.productRepository.findOne({
      status: statusEnum.ACTIVE,
      id: id,
    });
    return found;
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    id: string,
  ): Promise<string> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .update()
      .set(updateProductDto)
      .where('id = :id', { id: id })
      .execute();
    console.log(product);

    try {
      // await this.productRepository.save(product);
    } catch (err) {
      // throw new NotFoundException('failed...');
    }
    return 'product';
  }

  async search(search: string): Promise<Product[]> {
    const query = {
      where: [
        {
          title: Like(`%${search}%`),
          status: statusEnum.ACTIVE,
        },
      ],
    };

    const found = await this.productRepository.find(query);

    // const find = await this.productRepository
    //   .createQueryBuilder('product')
    //   .where('status= :statusVar', { statusVar: statusEnum.ACTIVE })
    //   .andWhere(
    //     new Brackets((qb) => {
    //       qb.where('title like :search', { search: `%${search}%` }).orWhere(
    //         'category like :search',
    //         { search: `%${search}%` },
    //       );
    //     }),
    //   )
    //   .orWhere(
    //     new Brackets((qb) => {
    //       qb.where('status= :statusVar', {
    //         statusVar: statusEnum.ACTIVE,
    //       }).andWhere(':search= ANY (ingredients)', { search: search });
    //     }),
    //   )
    //   .getMany();

    // .where('title like :search', { search: `%${search}%` })
    // .orWhere(':search= ANY (ingredients)', { search: search })
    // .andWhere('status= :statusVar', { statusVar: statusEnum.ACTIVE })

    // if (!find) {
    //   throw new NotFoundException('No Product found!');
    // }
    return found;
  }

  async delete(id: string): Promise<string> {
    // const found = await this.productRepository.(id);
    // const found = await this.productRepository
    //   .createQueryBuilder('product')
    //   .delete()
    //   .where('id = :id', { id: id })
    //   .execute();

    const found = await this.productRepository
      .createQueryBuilder('product')
      .update()
      .set({ status: statusEnum.DELETED })
      .where('id = :id', { id: id })
      .execute();

    if (!found) {
      throw new NotFoundException('No Product found!');
    }
    return 'deleted successfully.';
  }

  async getDeleted(): Promise<Product[]> {
    const found = await this.productRepository.find({
      status: statusEnum.DELETED,
    });

    // if (!found) {
    //   throw new NotFoundException('No Product found!');
    // }
    return found;
  }
  async searchTitle(search: string): Promise<any[]> {
    console.log(search);

    const found = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.title'])
      .where('title like :search', { search: `%${search}%` })
      .getMany();
    console.log(found);

    return found;
  }
}
