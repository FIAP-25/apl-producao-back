import { ok } from '@/application/helper/http.helper';
import { IProducaoUseCase } from '@/domain/contract/usecase/producao.interface';
import { AtualizarStatusProducaoInput, CadastrarProducaoInput } from '@/infrastructure/dto/producao/producao.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Producao')
@Controller('api/producao')
export class ProducaoController {
    constructor(private producaoUseCase: IProducaoUseCase) {}

    @Get('listar')
    @ApiOperation({ summary: 'Obtem lista producao' })
    async obterListaProducao(@Res() res: Response): Promise<any> {
        const pagamentoStatus = await this.producaoUseCase.obterListaProducao();

        return ok(pagamentoStatus, res);
    }

    @Get('listarProducaoByPedidoId')
    @ApiOperation({ summary: 'Obtem status producao pelo id do pedido' })
    async obterPedidoId(@Query('id') id: string, @Res() res: Response): Promise<any> {
        const pagamentoStatus = await this.producaoUseCase.obterListaProducao();

        return ok(pagamentoStatus, res);
    }

    @Patch('atualizar/:pedidoId')
    @ApiOperation({ summary: 'Atualiza status producao pelo id do pedido' })
    async atualizarStatusProducao(@Param('pedidoId') pedidoId: string, @Body() body: AtualizarStatusProducaoInput, @Res() res: Response): Promise<any> {
        const pedidoAtualizado = await this.producaoUseCase.atualizarStatusProducao(pedidoId, body);

        return ok(pedidoAtualizado, res);
    }

    @Post('cadastrar')
    @ApiOperation({ summary: 'Cadastrar uma nova producao' })
    async cadastrarProducao(@Body() body: CadastrarProducaoInput, @Res() res: Response): Promise<any> {
        const pedidoAtualizado = await this.producaoUseCase.cadastrarProducao(body);
        return ok(pedidoAtualizado, res);
    }
}
