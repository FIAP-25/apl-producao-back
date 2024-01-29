import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { BaseController } from './controller/base/base.controller';
import { HealthController } from './controller/health/health.controller';
import { ProducaoController } from './controller/producao/producao.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [ProducaoController, HealthController, BaseController]
})
export default class ApplicationModule {}
