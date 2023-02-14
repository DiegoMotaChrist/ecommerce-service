import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { StockService } from '../services/stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const stock = await this.stockService.findById({ id });
    return stock;
  }

  @Get()
  async getList() {
    const stocks = await this.stockService.findAll();
    return stocks;
  }

  @Patch(':id')
  async edit(@Body() body: any, @Param('id') id: string) {
    const stock = await this.stockService.edit({ body, id });
    return stock;
  }

  @Patch('/delete/:id')
  async delete(@Param('id') id: string) {
    const stock = await this.stockService.delete({ id });
    return stock;
  }

  @Post()
  async create(@Body() body: any) {
    await this.stockService.create({ ...body });
  }
}
