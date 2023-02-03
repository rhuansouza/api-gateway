import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { ClientProxySmartRanking } from './proxyrmq/client-proxy';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { DesafiosModule } from './desafios/desafios.module';
import { RankingsService } from './rankings/rankings.service';
import { RankingsController } from './rankings/rankings.controller';
import { RankingsModule } from './rankings/rankings.module';

@Module({
  imports: [
    CategoriasModule,
    ProxyRMQModule,
    JogadoresModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DesafiosModule,
    RankingsModule,
  ],
  controllers: [RankingsController],
  providers: [ClientProxySmartRanking, RankingsService],
})
export class AppModule {}
