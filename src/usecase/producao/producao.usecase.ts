import { mapper } from '@/application/mapper/base.mapper';
import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { IProducaoUseCase } from '@/domain/contract/usecase/producao.interface';
import { IPedidoClient } from '@/domain/client/pedido.client.interface';
import { Producao } from '@/domain/entity/producao.model';
import { ErroNegocio } from '@/domain/exception/erro.module';
import { AtualizarStatusProducaoInput, AtualizarStatusProducaoOutput, CadastrarProducaoInput, CadastrarProducaoOutput } from '@/infrastructure/dto/producao/producao.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProducaoUseCase implements IProducaoUseCase {
    constructor(private producaoRepository: IProducaoRepository, private produtoClient: IPedidoClient) {}
    async obterListaProducao(): Promise<Producao[]> {
        const response = this.producaoRepository.find();
        this.produtoClient.save('123');
        return response;
    }

    async filtroListaPedido(pedidoId: string): Promise<Producao | null> {
        const response = this.producaoRepository.findByPedidoId(pedidoId);
        return response;
    }

    async atualizarStatusProducao(pedidoId: string, input: AtualizarStatusProducaoInput): Promise<AtualizarStatusProducaoOutput> {
        return {
            id: pedidoId,
            producaoStatus: input.producaoStatus
        };
    }

    async cadastrarProducao(producao: CadastrarProducaoInput): Promise<CadastrarProducaoOutput> {
        const pedidoExistente = this.filtroListaPedido(producao.pedidoId);
        console.log(pedidoExistente);

        // if (pedidoExistente != null) {
        //     console.log('pedido ja existe');
        //     throw new ErroNegocio('pedido-existente');
        // }

        const pedido: Producao = {
            pedidoId: producao.pedidoId,
            producaoStatus: 'PREPARO'
        };

        console.log(pedido);
        const pagamentoSalvo = await this.producaoRepository.save(pedido);
        console.log(pagamentoSalvo);

        return mapper.map(pagamentoSalvo, Producao, CadastrarProducaoOutput);
    }
}
