import { IProducaoUseCase } from '@/domain/contract/usecase/producao.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { ProducaoUseCase } from './producao/producao.usecase';

@Module({
    imports: [InfrastructureModule],
    providers: [{ provide: IProducaoUseCase, useClass: ProducaoUseCase }],
    exports: [IProducaoUseCase]
})
export default class UseCaseModule {}
