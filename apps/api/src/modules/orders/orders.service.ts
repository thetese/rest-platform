import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const menuItems = await this.prisma.menuItem.findMany({
      where: { id: { in: dto.items.map((item) => item.menuItemId) } },
    });
    const itemsWithPrice = dto.items.map((item) => {
      const menuItem = menuItems.find((menu) => menu.id === item.menuItemId);
      return {
        menuItemId: item.menuItemId,
        name: menuItem?.name || 'Unknown',
        price: menuItem?.price || 0,
        quantity: item.quantity,
        note: item.note,
        status: 'PENDING',
      };
    });
    const subtotal = itemsWithPrice.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
    const discount = dto.discount || 0;
    const total = subtotal - discount;

    return this.prisma.order.create({
      data: {
        branchId: dto.branchId,
        tableNo: dto.tableNo,
        type: dto.type,
        status: 'PENDING',
        subtotal,
        discount,
        total,
        items: { create: itemsWithPrice },
      },
      include: { items: true },
    });
  }

  async updateStatus(orderId: string, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    });
  }

  async list(branchId: string) {
    return this.prisma.order.findMany({
      where: { branchId },
      include: { items: true, payments: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
