import { HttpModule as HttpModuleAxios } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagingModule } from '../messaging/messaging.module';

import { OrderController } from './controllers/order.controller';
import { StockController } from './controllers/stock.controller';
import { OrderService } from './services/order.service';
import { StockService } from './services/stock.service';

@Module({
  imports: [HttpModuleAxios, MessagingModule],
  controllers: [OrderController, StockController],
  providers: [OrderService, StockService],
})
export class HttpModule {}
