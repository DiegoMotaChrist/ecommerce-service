import { IsArray, IsNotEmpty, Length } from 'class-validator';

export class CreateOrderBody {
  @IsNotEmpty()
  @IsArray()
  stockIds: string[];

  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  @IsNotEmpty()
  @Length(5, 100)
  description: string;

  @IsNotEmpty()
  @Length(5, 100)
  category: string;
}
