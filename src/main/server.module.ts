import ApplicationModule from '@/application/application.module';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), ApplicationModule, InfrastructureModule, UseCaseModule],
    providers: []
})
export class ServerModule {}
