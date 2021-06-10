import { IsNotEmpty, IsArray, IsBoolean } from 'class-validator';
import { statusEnum } from '../status.enum';

export class UpdateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  status: statusEnum;

  @IsNotEmpty()
  description: string;

  @IsArray()
  ingredients: [];

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  image: string;

  @IsBoolean()
  recommended: boolean;
}
