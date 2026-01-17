import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { KdsModule } from './kds/kds.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [AuthModule, OrdersModule, PaymentsModule, InventoryModule, ReportsModule, KdsModule],
  providers: [PrismaService],
})
export class AppModule {}
