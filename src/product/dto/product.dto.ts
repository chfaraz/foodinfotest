import { IsNotEmpty, IsArray, IsBoolean } from 'class-validator';

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

  // @IsNotEmpty()
  // image: string;

  @IsBoolean()
  recommended: boolean;
}
