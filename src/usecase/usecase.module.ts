import { IProducaoUseCase } from '@/domain/contract/usecase/producao.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { ProducaoUseCase } from './producao/producao.usecase';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        InfrastructureModule,
        ClientsModule.register([
            {
                name: 'PRODUCTION_STATUS_ORDER',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://jtfpcoju:FnDoQbzjHsseEW_9OsVLJ2rERhn1JheT@woodpecker.rmq.cloudamqp.com/jtfpcoju'],
                    queue: 'production-status-queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ])
    ],
    providers: [{ provide: IProducaoUseCase, useClass: ProducaoUseCase }],
    exports: [IProducaoUseCase]
})
export default class UseCaseModule {}
