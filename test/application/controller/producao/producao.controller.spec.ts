import { ProducaoController } from '@/application/controller/producao/producao.controller';
import { IProducaoUseCase } from '@/domain/contract/usecase/producao.interface';
import { Producao } from '@/domain/entity/producao.model';
import { AtualizarStatusProducaoInput, AtualizarStatusProducaoOutput, CadastrarProducaoInput, CadastrarProducaoOutput } from '@/infrastructure/dto/producao/producao.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

describe('ProducaoController', () => {
    let controller: ProducaoController;
    let mockProducaoUseCase: jest.Mocked<IProducaoUseCase>;

    beforeEach(async () => {
        mockProducaoUseCase = {
            obterListaProducao: jest.fn().mockResolvedValue([]),
            atualizarStatusProducao: jest.fn().mockResolvedValue({}),
            cadastrarProducao: jest.fn().mockResolvedValue({}),
            atualizarPedido: jest.fn().mockResolvedValue({})
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProducaoController],
            providers: [
                {
                    provide: IProducaoUseCase,
                    useValue: mockProducaoUseCase
                }
            ]
        }).compile();

        controller = module.get<ProducaoController>(ProducaoController);
    });

    const mockResponse = () => {
        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    describe('obterStatusPagamento', () => {
        it('deve retornar a lista de status de produção', async () => {
            const mockResponseData: Producao[] = [
                {
                    id: '1',
                    pedidoId: '123',
                    producaoStatus: 'Em produção'
                }
            ];
            mockProducaoUseCase.obterListaProducao.mockResolvedValue(mockResponseData);

            const mockRes = mockResponse();
            await controller.obterStatusPagamento(mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ dados: mockResponseData });
        });
    });

    describe('atualizarStatusPagamento', () => {
        it('deve atualizar o status do pagamento e retornar o pedido atualizado', async () => {
            const mockPedido: AtualizarStatusProducaoOutput = {
                id: '1',
                producaoStatus: 'Concluído'
            };
            mockProducaoUseCase.atualizarStatusProducao.mockResolvedValue(mockPedido);

            const atualizarStatusProducaoInput: AtualizarStatusProducaoInput = {
                producaoStatus: 'Concluído'
            };

            const mockRes = mockResponse();
            await controller.atualizarStatusPagamento('1', atualizarStatusProducaoInput, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ dados: mockPedido });
        });
    });

    describe('pagarPedido', () => {
        it('deve cadastrar um novo pedido e retorná-lo', async () => {
            const mockPedido: CadastrarProducaoOutput = {
                id: '1',
                pedidoId: '123',
                producaoStatus: 'Pendente'
            };
            mockProducaoUseCase.cadastrarProducao.mockResolvedValue(mockPedido);

            const mockRes = mockResponse();
            await controller.pagarPedido(
                {
                    pedidoId: '123',
                    produtoId: '456',
                    quantidade: 10
                } as CadastrarProducaoInput,
                mockRes
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ dados: mockPedido });
        });
    });
});
