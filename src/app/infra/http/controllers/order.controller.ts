import { TopicEnum } from '@app/enum/topics.enum';
import { KafkaProducerService } from '@app/infra/messaging/kafka-producer/kafka-producer.service';
import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { CancelOrderBody } from '../dtos/cancel-order-body';
import { CreateOrderBody } from '../dtos/create-order-body';
import { EditOrderBody } from '../dtos/edit-order-body';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(
    private kafkaProducerService: KafkaProducerService,
    private orderService: OrderService,
  ) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const order = await this.orderService.findById({ id });
    return order;
  }

  @Get()
  async getList() {
    const orders = await this.orderService.findAll();
    return orders;
  }

  @Patch(':id')
  async edit(@Body() body: EditOrderBody, @Param('id') id: string) {
    await this.kafkaProducerService.sendMessageToOrderTopic(
      { ...body, orderId: id },
      TopicEnum.EDIT_ORDER,
    );
  }

  @Patch('/cancel/:id')
  async cancel(@Body() body: CancelOrderBody, @Param('id') id: string) {
    await this.kafkaProducerService.sendMessageToOrderTopic(
      { ...body, orderId: id },
      TopicEnum.CANCEL_ORDER,
    );
  }

  @Post()
  async create(@Body() body: CreateOrderBody): Promise<void> {
    await this.kafkaProducerService.sendMessageToOrderTopic(
      body,
      TopicEnum.SEND_ORDER,
    );
  }
}
