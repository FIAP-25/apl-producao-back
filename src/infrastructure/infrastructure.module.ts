import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './repository/helper/connection.module';
import { ProducaoEntity } from './entity/producao.entity';
import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { ProducaoRepository } from './repository/producao/producao.repository';
import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { AxiosClient } from './client/axios.client';
@Module({
    imports: [TypeOrmModule.forFeature([ProducaoEntity]), ConnectionModule],
    providers: [
        { provide: IProducaoRepository, useClass: ProducaoRepository },
        { provide: IAxiosClient, useClass: AxiosClient }
    ],
    exports: [ConnectionModule, IProducaoRepository, IAxiosClient]
})
export default class InfrastructureModule {}
