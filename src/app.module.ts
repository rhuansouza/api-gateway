import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { ClientProxySmartRanking } from './proxyrmq/client-proxy';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [CategoriasModule, ProxyRMQModule, JogadoresModule],
  controllers: [],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
