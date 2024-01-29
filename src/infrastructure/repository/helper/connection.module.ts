import { ProducaoEntity } from '@/infrastructure/entity/producao.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            // url: 'mongodb://root:example@mongo:27017/fiap?authSource=admin',
            type: 'mongodb',
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_SCHEMA,
            authSource: process.env.DATABASE_AUTHSOURCE,
            port: Number(process.env.DATABASE_PORT),
            entities: [ProducaoEntity],
            synchronize: true
        })
    ]
})
export class ConnectionModule {}
