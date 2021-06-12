import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { statusEnum } from '@src/product/status.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: statusEnum.ACTIVE })
  status: statusEnum;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('varchar', { array: true })
  ingredients: string[];

  @Column()
  category: string;

  @Column()
  reason: string;

  @Column()
  image: string;

  @Column()
  recommended: boolean;

  @Column({ default: new Date() })
  createdAt: Date;
}
