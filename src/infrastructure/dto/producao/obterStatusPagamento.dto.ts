import { AutoMap } from '@automapper/classes';

export class ObterStatusProducaoOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    producaoStatus: string;
}
