import { Length, IsOptional, IsArray } from 'class-validator';

export class EditOrderBody {
  @Length(5, 100)
  @IsOptional()
  name: string;

  @Length(5, 100)
  @IsOptional()
  description: string;

  @Length(5, 100)
  @IsOptional()
  category: string;

  @IsOptional()
  @IsArray()
  stockIds: string[];
}
