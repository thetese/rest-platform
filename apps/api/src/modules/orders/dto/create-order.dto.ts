import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  menuItemId: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  note?: string;
}

export class CreateOrderDto {
  @IsString()
  branchId: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  tableNo?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  @IsNumber()
  discount?: number;
}
