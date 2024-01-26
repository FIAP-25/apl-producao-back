import { IProducaoRepository } from '@/domain/contract/repository/producao.interface';
import { Producao } from '@/domain/entity/producao.model';
import { AtualizarStatusProducaoInput, CadastrarProducaoInput } from '@/infrastructure/dto/producao/producao.dto';
import { ProducaoUseCase } from '@/usecase/producao/producao.usecase';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProducaoUseCase', () => {
    let useCase: ProducaoUseCase;
    let mockProducaoRepository: jest.Mocked<IProducaoRepository>;

    beforeEach(async () => {
        mockProducaoRepository = {
            find: jest.fn(),
            findByPedidoId: jest.fn(),
            save: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProducaoUseCase,
                {
                    provide: IProducaoRepository,
                    useValue: mockProducaoRepository
                }
            ]
        }).compile();

        useCase = module.get<ProducaoUseCase>(ProducaoUseCase);
    });

    it('deve obter a lista de produção', async () => {
        const mockProducoes = [new Producao(), new Producao()];
        mockProducaoRepository.find.mockResolvedValue(mockProducoes);

        const producoes = await useCase.obterListaProducao();

        expect(producoes).toHaveLength(mockProducoes.length);
        expect(mockProducaoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve filtrar a lista de pedidos pelo ID do pedido', async () => {
        const mockProducao = new Producao();
        mockProducaoRepository.findByPedidoId.mockResolvedValue(mockProducao);

        const pedidoId = '123';
        const producao = await useCase.filtroListaPedido(pedidoId);

        expect(producao).toBeDefined();
        expect(mockProducaoRepository.findByPedidoId).toHaveBeenCalledWith(pedidoId);
    });

    it('deve atualizar o status de produção', async () => {
        const pedidoId = '123';
        const input: AtualizarStatusProducaoInput = { producaoStatus: 'CONCLUIDO' };

        const output = await useCase.atualizarStatusProducao(pedidoId, input);

        expect(output).toEqual({ id: pedidoId, producaoStatus: input.producaoStatus });
    });

    it('deve cadastrar produção', async () => {
        const input: CadastrarProducaoInput = { pedidoId: '123' };

        mockProducaoRepository.findByPedidoId.mockResolvedValue(null);

        const novoProducao = new Producao();
        novoProducao.pedidoId = input.pedidoId;
        novoProducao.producaoStatus = 'PREPARO';

        mockProducaoRepository.save.mockResolvedValue(novoProducao);

        const output = await useCase.cadastrarProducao(input);

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
