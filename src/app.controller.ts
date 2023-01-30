import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { get } from 'http';
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);
  private clientAdminbackend: ClientProxy;

  async onApplicationBootstrap() {
    await this.clientAdminbackend.connect();
  }

  constructor() {
    //injeção de dependência pelo construtor
    this.clientAdminbackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  CriarCategoriaDto(@Body() criarCategoriaDto: CriarCategoriaDto) {
    //enviando mensagem para o topico
    this.clientAdminbackend.emit('criar-categoria', criarCategoriaDto);
    this.logger.log(
      'Mensagem enviada a fila no topico criar-categoria',
      JSON.stringify(criarCategoriaDto),
    );
  }

  @Get('categorias')
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {
    this.clientAdminbackend.connect();
    return this.clientAdminbackend.send('consultar-categorias', _id ? _id : '');
  }

  @Put('categorias/:_id')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string,
  ): Promise<void> {
    this.clientAdminbackend.emit('atualizar-categoria', {
      id: _id,
      categoria: atualizarCategoriaDto,
    });
  }
}
