import { IsNumber, IsString } from 'class-validator';

export class CreateMovementDto {
  @IsString()
  ingredientId: string;

  @IsString()
  branchId: string;

  @IsString()
  type: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitCost: number;

  @IsString()
  note?: string;
}
