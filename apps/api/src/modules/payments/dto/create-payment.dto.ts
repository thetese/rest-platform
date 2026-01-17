import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  orderId: string;

  @IsString()
  method: string;

  @IsNumber()
  amount: number;

  @IsString()
  idempotencyKey: string;
}
