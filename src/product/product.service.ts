import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '@src/product/dto/product.dto';
import { Product } from '@src/product/product.entity';
import { ProductRepository } from '@src/product/product.repository';
import { ILike } from 'typeorm';
import { statusEnum } from './status.enum';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getProducts(status: string): Promise<Product[]> {
    return this.productRepository.find({ status: parseInt(status) });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
    //   const found = await this.productRepository
    //   .createQueryBuilder()
    //   .offset(skippedItems)
    //   .limit(6)
    //   .where({ status: parseInt(status) })
    //   .getMany();
    // return found;
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

  async updateProduct(id: string, { ...product }): Promise<Product> {
    console.log(product);

    await this.productRepository
      .createQueryBuilder('product')
      .update()
      .set({ ...product })
      .where('id = :id', { id: id })
      .execute();

    const found = await this.productRepository.findOne({
      id: id,
    });
    return found;
  }

  async search(search: string, status: string): Promise<Product[]> {
    const query = {
      where: [
        {
          title: ILike(`%${search}%`),
          status: parseInt(status),
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

  async searchTitle(search: string, status: string): Promise<Product[]> {
    console.log(search);

    const found = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.title'])
      .where('title ilike :search', { search: `%${search}%` })
      .andWhere('status= :statusVar', { statusVar: status })
      .getMany();
    console.log(found);

    return found;
  }
}
