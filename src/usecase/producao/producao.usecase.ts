import { mapper } from '@/application/mapper/base.mapper';
import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { IProducaoUseCase } from '@/domain/contract/usecase/producao.interface';
import { Producao } from '@/domain/entity/producao.model';
import { AtualizarStatusProducaoInput, AtualizarStatusProducaoOutput, CadastrarProducaoInput, CadastrarProducaoOutput } from '@/infrastructure/dto/producao/producao.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ObjectId } from 'typeorm';

@Injectable()
export class ProducaoUseCase implements IProducaoUseCase {
    constructor(private producaoRepository: IProducaoRepository, private axiosClient: IAxiosClient, @Inject('PRODUCTION_STATUS_ORDER') private readonly client: ClientProxy) {}

    async obterListaProducao(): Promise<Producao[]> {
        const response = this.producaoRepository.find();
        return response;
    }

    async obterPedidoId(pedidoId: string): Promise<Producao> {
        const response = this.producaoRepository.findByPedidoId(pedidoId);
        return response;
    }

    async atualizarStatusProducao(pedidoId: string, input: AtualizarStatusProducaoInput): Promise<AtualizarStatusProducaoOutput> {
        var body = {
            id: pedidoId,
            statusTag: 'pedido_finalizado'
        };
        await this.client.emit('production_status_order', body);

        const pedidoResponse = await this.obterPedidoId(pedidoId);

        const pedido: Producao = {
            pedidoId: pedidoId,
            producaoStatus: input.producaoStatus
        };

        const response = await this.producaoRepository.save(pedido);
        return {
            id: pedidoId,
            producaoStatus: input.producaoStatus
        };
    }

    async cadastrarProducao(producao: CadastrarProducaoInput): Promise<CadastrarProducaoOutput> {
        const pedidoExistente = this.obterPedidoId(producao.pedidoId);

        // if (pedidoExistente != null) {
        //     console.log('pedido ja existe');
        //     throw new ErroNegocio('pedido-existente');
        // }

        const pedido: Producao = {
            pedidoId: producao.pedidoId,
            producaoStatus: 'PREPARO'
        };

        const pagamentoSalvo = await this.producaoRepository.save(pedido);

        return mapper.map(pagamentoSalvo, Producao, CadastrarProducaoOutput);
    }

    async atualizarPedido(id: string): Promise<void> {
        await this.axiosClient
            .executarChamada('patch', `pedidos/status/${id}`, { statusTag: 'pedido_finalizado' })
            .then((resultado) => {
                console.log('resultado: ', resultado);
            })
            .catch((erro) => {
                console.log('erro: ', erro);
            });
    }
}
