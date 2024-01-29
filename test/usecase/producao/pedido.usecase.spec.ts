import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { Producao } from '@/domain/entity/producao.model';
import { AtualizarStatusProducaoInput, CadastrarProducaoInput } from '@/infrastructure/dto/producao/producao.dto';
import { PedidoUseCase } from '@/usecase/producao/pedido.usecase';
import { Test, TestingModule } from '@nestjs/testing';

describe('PedidoUseCase', () => {
    let pedidoUseCase: PedidoUseCase;
    let mockProducaoRepository: jest.Mocked<IProducaoRepository>;

    beforeEach(async () => {
        mockProducaoRepository = {
            find: jest.fn(),
            findByPedidoId: jest.fn(),
            save: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PedidoUseCase,
                {
                    provide: IProducaoRepository,
                    useValue: mockProducaoRepository
                }
            ]
        }).compile();

        pedidoUseCase = module.get<PedidoUseCase>(PedidoUseCase);
    });

    it('deve obter a lista de produção', async () => {
        const mockProducoes = [new Producao(), new Producao()];
        mockProducaoRepository.find.mockResolvedValue(mockProducoes);

        const producoes = await pedidoUseCase.obterListaProducao();

        expect(producoes).toEqual(mockProducoes);
        expect(mockProducaoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve filtrar a lista de pedidos pelo ID do pedido', async () => {
        const mockProducao = new Producao();
        mockProducaoRepository.findByPedidoId.mockResolvedValue(mockProducao);

        const pedidoId = '123';
        const producao = await pedidoUseCase.filtroListaPedido(pedidoId);

        expect(producao).toEqual(mockProducao);
        expect(mockProducaoRepository.findByPedidoId).toHaveBeenCalledWith(pedidoId);
    });

    it('deve atualizar o status de produção', async () => {
        const pedidoId = '123';
        const input: AtualizarStatusProducaoInput = { producaoStatus: 'CONCLUIDO' };

        const output = await pedidoUseCase.atualizarStatusProducao(pedidoId, input);

        expect(output).toEqual({ id: pedidoId, producaoStatus: input.producaoStatus });
    });

    it('deve cadastrar produção', async () => {
        const input: CadastrarProducaoInput = { pedidoId: '123' };

        mockProducaoRepository.findByPedidoId.mockResolvedValue(null);

        const novoProducao = new Producao();
        novoProducao.pedidoId = input.pedidoId;
        novoProducao.producaoStatus = 'PREPARO';

        mockProducaoRepository.save.mockResolvedValue(novoProducao);

        const output = await pedidoUseCase.cadastrarProducao(input);

        expect(mockProducaoRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                pedidoId: input.pedidoId,
                producaoStatus: 'PREPARO'
            })
        );

        expect(output).toBeDefined();
        expect(output).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                producaoStatus: 'PREPARO'
            })
        );
    });
});
