import { ProducaoEntity } from '@/infrastructure/entity/producao.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            // url: 'mongodb://root:example@mongo:27017/fiap?authSource=admin',
            type: 'mongodb',
            host: 'mongo',
            username: 'root',
            password: 'example',
            database: 'fiap',
            authSource: 'admin',
            port: 27018,
            entities: [ProducaoEntity],
            synchronize: true
        })
    ]
})
export class ConnectionModule {}
