import { IsNotEmpty, Length } from 'class-validator';

export class CancelOrderBody {
  @IsNotEmpty()
  @Length(5, 100)
  reason: string;
}
