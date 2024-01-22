import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('producao')
export class ProducaoEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    pedidoId: string;

    @Column()
    producaoStatus: string;
}
