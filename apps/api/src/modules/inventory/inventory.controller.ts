import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post('movements')
  async createMovement(@Body() dto: CreateMovementDto) {
    return this.inventoryService.createMovement(dto);
  }

  @Get('low-stock')
  async lowStock(@Query('branchId') branchId: string) {
    return this.inventoryService.lowStock(branchId);
  }
}
