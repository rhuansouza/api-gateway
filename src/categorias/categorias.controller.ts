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

import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
  private logger = new Logger(CategoriasController.name);
  async onApplicationBootstrap() {
    await this.clientAdminbackend.connect();
  }
  //private clientAdminbackend: ClientProxy;
  /*
  async onApplicationBootstrap() {
    await this.clientAdminbackend.connect();
  }
*/
  /*
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
  */
  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}
  private clientAdminbackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  @Post()
  @UsePipes(ValidationPipe)
  CriarCategoriaDto(@Body() criarCategoriaDto: CriarCategoriaDto) {
    //enviando mensagem para o topico
    this.clientAdminbackend.emit('criar-categoria', criarCategoriaDto);
    this.logger.log(
      'Mensagem enviada a fila no topico criar-categoria',
      JSON.stringify(criarCategoriaDto),
    );
  }

  @Get()
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {
    return this.clientAdminbackend.send('consultar-categorias', _id ? _id : '');
  }

  @Put(':_id')
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
