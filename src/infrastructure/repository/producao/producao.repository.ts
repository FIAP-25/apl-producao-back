import { mapper } from '@/application/mapper/base.mapper';
import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { Producao } from '@/domain/entity/producao.model';
import { ProducaoEntity } from '@/infrastructure/entity/producao.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ProducaoRepository implements IProducaoRepository {
    constructor(
        @InjectRepository(ProducaoEntity)
        private producaoRepository: Repository<ProducaoEntity>
    ) {}

    async find(): Promise<Producao[]> {
        const producoes = await this.producaoRepository.find();
        return mapper.mapArray(producoes, ProducaoEntity, Producao);
    }

    async findByPedidoId(pedidoId: string): Promise<Producao | null> {
        const pagamento = await this.producaoRepository.findOneBy({ pedidoId: pedidoId });
        if (pagamento == null) return null;

        return mapper.map(pagamento, ProducaoEntity, Producao);
    }

    async save(pagamento: Producao): Promise<Producao> {
        return await this.producaoRepository.save(pagamento);
    }
}
