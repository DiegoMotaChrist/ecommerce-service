import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';

@Module({
  imports: [],
  providers: [KafkaProducerService],
  controllers: [],
  exports: [KafkaProducerService],
})
export class MessagingModule {}
