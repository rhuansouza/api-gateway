import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientProxySmartRanking {
  constructor(private configService: ConfigService) {}

  getClientProxyAdminBackendInstance(): ClientProxy {
    const RABBITMQ_USER = this.configService.get('RABBITMQ_USER');
    const RABBITMQ_PASSWORD = this.configService.get('RABBITMQ_PASSWORD');
    const RABBITMQ_URL = this.configService.get('RABBITMQ_URL');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}`],
        queue: 'admin-backend',
      },
    });
  }
  
  getClientProxyDesafiosInstance(): ClientProxy {
    const RABBITMQ_USER = this.configService.get('RABBITMQ_USER');
    const RABBITMQ_PASSWORD = this.configService.get('RABBITMQ_PASSWORD');
    const RABBITMQ_URL = this.configService.get('RABBITMQ_URL');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}`],
        queue: 'desafios',
      },
    });
  }

  getClientProxyRankingsInstance(): ClientProxy {
    const RABBITMQ_USER = this.configService.get('RABBITMQ_USER');
    const RABBITMQ_PASSWORD = this.configService.get('RABBITMQ_PASSWORD');
    const RABBITMQ_URL = this.configService.get('RABBITMQ_URL');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}`],
        queue: 'rankings',
      },
    });
  }
  
}
