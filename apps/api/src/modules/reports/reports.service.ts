import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async profitSummary(branchId: string) {
    const orders = await this.prisma.order.findMany({ where: { branchId } });
    const expenses = await this.prisma.expense.findMany({ where: { branchId } });
    const revenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const cogs = 0;
    const grossProfit = revenue - cogs;
    const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const netProfit = grossProfit - totalExpenses;
    return { revenue, cogs, grossProfit, totalExpenses, netProfit };
  }
}
