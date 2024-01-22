import { AutoMap } from '@automapper/classes';
import { ObjectId } from 'typeorm';

export class Producao {
    @AutoMap()
    id?: ObjectId | string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    producaoStatus: string;
}
