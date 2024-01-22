/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ErroBase } from '@/domain/exception/erro.module';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import dayjs from 'dayjs';

@Catch()
export class ExceptionInterceptor implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: ErroBase, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const responseBody = {
            tipo: exception.tipo ?? exception.name,
            mensagem: exception.mensagem ?? exception.message,
            mensagemDetalhe: exception.detalhes ?? exception.stack,
            rota: httpAdapter.getRequestUrl(ctx.getRequest()),
            timestamp: dayjs().toISOString()
        };

        let statusCode: number = 500;

        switch (exception.tipo) {
            case 'ErroNegocio':
                statusCode = 422;
                break;
            case 'ErroAcesso':
                statusCode = 400;
                break;
            case 'ErroSistema':
                statusCode = 500;
                break;
            case 'ErroValidacao':
                statusCode = 401;
                break;
            default:
                statusCode = 500;

                break;
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
}
