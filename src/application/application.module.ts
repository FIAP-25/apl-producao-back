import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { HeatlhController } from './controller/health/health.controller';
import { BaseController } from './controller/base/base.controller';
import { ProducaoController } from './controller/producao/producao.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [ProducaoController, HeatlhController, BaseController]
})
export default class ApplicationModule {}
