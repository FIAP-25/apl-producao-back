import { Producao } from '@/domain/entity/producao.model';
import { CadastrarProducaoOutput } from '@/infrastructure/dto/producao/producao.dto';
import { ProducaoEntity } from '@/infrastructure/entity/producao.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

export const mapper = createMapper({
    strategyInitializer: classes()
});

// #region Producao

createMap(
    mapper,
    ProducaoEntity,
    Producao,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => String(source.id))
    ),
    forMember(
        (destination) => destination.pedidoId,
        mapFrom((source) => String(source.pedidoId))
    ),
    forMember(
        (destination) => destination.producaoStatus,
        mapFrom((source) => String(source.producaoStatus))
    )
);
createMap(
    mapper,
    Producao,
    CadastrarProducaoOutput,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => String(source.id))
    )
);
// #endregion
