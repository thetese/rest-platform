import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    return this.prisma.payment.upsert({
      where: { idempotencyKey: dto.idempotencyKey },
      update: {},
      create: {
        orderId: dto.orderId,
        method: dto.method,
        amount: dto.amount,
        idempotencyKey: dto.idempotencyKey,
      },
    });
  }
}
