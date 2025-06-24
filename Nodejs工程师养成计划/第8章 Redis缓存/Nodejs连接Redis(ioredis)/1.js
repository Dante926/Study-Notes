import { Provide, Inject } from '@midwayjs/decorator';
import { RabbitMQConsumer } from '@midwayjs/rabbitmq';

@Provide()
export class NotificationService {
  @Inject()
  rabbitmqConsumer: RabbitMQConsumer;

  async onModuleInit() {
    await this.rabbitmqConsumer.consume('userNotifyQueue', async (msg) => {
      const { userId, message } = JSON.parse(msg.content.toString());
      console.log(`同步用户信息 ${userId}: ${message}`);
    });
  }
}
