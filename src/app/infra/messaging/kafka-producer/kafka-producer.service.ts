import { Injectable } from '@nestjs/common/decorators';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  async sendMessageToOrderTopic(message: any, topic: string) {
    const kafka = new Kafka({
      clientId: 'order',
      brokers: ['hardy-sunbeam-9743-us1-kafka.upstash.io:9092'],
      sasl: {
        mechanism: 'scram-sha-256',
        username:
          'aGFyZHktc3VuYmVhbS05NzQzJJaixZhZtw4trvYhaceDio5q37SogdEPhJNlXwE',
        password: '76174759430a42fe8895eced47ef2d6a',
      },
      ssl: true,
    });

    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
