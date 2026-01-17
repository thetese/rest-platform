import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async createMovement(dto: CreateMovementDto) {
    return this.prisma.stockMovement.create({
      data: {
        ingredientId: dto.ingredientId,
        branchId: dto.branchId,
        type: dto.type,
        quantity: dto.quantity,
        unitCost: dto.unitCost,
        note: dto.note,
      },
    });
  }

  async lowStock(branchId: string) {
    const ingredients = await this.prisma.ingredient.findMany();
    return ingredients.map((ingredient) => ({
      ingredientId: ingredient.id,
      name: ingredient.name,
      branchId,
      reorderLevel: 10,
      currentQty: 0,
    }));
  }
}
