import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarStatusProducaoInput {
    @AutoMap()
    @ApiProperty({ required: true })
    producaoStatus: string;
}

export class CadastrarProducaoInput {
    @AutoMap()
    @ApiProperty({ required: true })
    pedidoId: string;
}

export class AtualizarStatusProducaoOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    producaoStatus: string;
}

export class CadastrarProducaoOutput {
    @AutoMap()
    id?: string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    producaoStatus: string;
}
