import { Producao } from '@/domain/entity/producao.model';
import { ObterStatusProducaoOutput } from '@/infrastructure/dto/producao/obterStatusPagamento.dto';
import { AtualizarStatusProducaoInput, AtualizarStatusProducaoOutput, CadastrarProducaoInput, CadastrarProducaoOutput } from '@/infrastructure/dto/producao/producao.dto';

export abstract class IPedidoUseCase {
    abstract obterListaProducao(): Promise<Producao[]>;
    abstract atualizarStatusProducao(pedidoId: string, input: AtualizarStatusProducaoInput): Promise<AtualizarStatusProducaoOutput>;
    abstract cadastrarProducao(producao: CadastrarProducaoInput): Promise<CadastrarProducaoOutput>;
}
