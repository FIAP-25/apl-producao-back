import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './repository/helper/connection.module';
import { ProducaoEntity } from './entity/producao.entity';
import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { ProducaoRepository } from './repository/producao/producao.repository';
@Module({
    imports: [TypeOrmModule.forFeature([ProducaoEntity]), ConnectionModule],
    providers: [{ provide: IProducaoRepository, useClass: ProducaoRepository }],
    exports: [ConnectionModule, IProducaoRepository]
})
export default class InfrastructureModule {}
