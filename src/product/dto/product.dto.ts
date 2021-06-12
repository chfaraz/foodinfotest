import { IsNotEmpty, IsArray, IsBoolean, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsArray()
  ingredients: [];

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsBoolean()
  recommended: boolean;
}
