import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('profit')
  async profit(@Query('branchId') branchId: string) {
    return this.reportsService.profitSummary(branchId);
  }
}
