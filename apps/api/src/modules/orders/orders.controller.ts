import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  async list(@Query('branchId') branchId: string) {
    return this.ordersService.list(branchId);
  }

  @Patch(':id/status/:status')
  async updateStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
