import { Producao } from '@/domain/entity/producao.model';

export abstract class IProducaoRepository {
    abstract find(): Promise<Producao[]>;
    abstract findByPedidoId(pedidoId: string): Promise<Producao>;
    abstract save(pagamento: Producao): Promise<Producao>;
}
