import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './repository/helper/connection.module';
import { ProducaoEntity } from './entity/producao.entity';
import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { ProducaoRepository } from './repository/producao/producao.repository';
import { IPedidoClient } from '@/domain/client/pedido.client.interface';
import { PedidoClient } from '@/domain/client/pedido.client';
@Module({
    imports: [TypeOrmModule.forFeature([ProducaoEntity]), ConnectionModule],
    providers: [
        { provide: IProducaoRepository, useClass: ProducaoRepository },
        { provide: IPedidoClient, useClass: PedidoClient }
    ],
    exports: [ConnectionModule, IProducaoRepository, IPedidoClient]
})
export default class InfrastructureModule {}
