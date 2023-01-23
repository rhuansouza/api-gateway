import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);
  private clientAdminbackend: ClientProxy;

  constructor() {
    //injeção de dependência pelo construtor
    this.clientAdminbackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:rgeyrgheg@172.16.0.0:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async CriarCategoriaDto(@Body() criarCategoriaDto: CriarCategoriaDto) {
    //enviando mensagem para o topico
    return await this.clientAdminbackend.emit(
      'criar-categoria',
      criarCategoriaDto,
    );
  }
}
