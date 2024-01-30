import { ProducaoEntity } from '@/infrastructure/entity/producao.entity';
import { ProducaoRepository } from '@/infrastructure/repository/producao/producao.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProducaoRepository', () => {
    let repository: ProducaoRepository;
    let mockProducaoRepository: Partial<Repository<ProducaoEntity>>;

    beforeEach(async () => {
        mockProducaoRepository = {
            find: jest.fn() as jest.Mock,
            findOneBy: jest.fn() as jest.Mock,
            save: jest.fn() as jest.Mock
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProducaoRepository,
                {
                    provide: getRepositoryToken(ProducaoEntity),
                    useValue: mockProducaoRepository
                }
            ]
        }).compile();

        repository = module.get<ProducaoRepository>(ProducaoRepository);
    });

    it('deve encontrar produções', async () => {
        const mockProducoes = [new ProducaoEntity(), new ProducaoEntity()];
        (mockProducaoRepository.find as jest.Mock).mockResolvedValue(mockProducoes);

        const producoes = await repository.find();

        expect(producoes).toHaveLength(mockProducoes.length);
        expect(mockProducaoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve encontrar produção por ID do pedido', async () => {
        const mockProducaoEntity = new ProducaoEntity();
        (mockProducaoRepository.findOneBy as jest.Mock).mockResolvedValue(mockProducaoEntity);

        const pedidoId = '123';
        const producao = await repository.findByPedidoId(pedidoId);

        expect(producao).toBeDefined();
        expect(mockProducaoRepository.findOneBy).toHaveBeenCalledWith({ pedidoId });
    });

    it('deve salvar produção', async () => {
        const mockProducao = new ProducaoEntity();
        (mockProducaoRepository.save as jest.Mock).mockResolvedValue(mockProducao);

        const savedProducao = await repository.save(mockProducao);

        expect(savedProducao).toBeDefined();
        expect(mockProducaoRepository.save).toHaveBeenCalledWith(mockProducao);
    });

    it('deve retornar null ao não encontrar produção pelo ID do pedido', async () => {
        (mockProducaoRepository.findOneBy as jest.Mock).mockResolvedValue(null);

        const pedidoId = '123';
        const producao = await repository.findByPedidoId(pedidoId);

        expect(producao).toBeNull();
        expect(mockProducaoRepository.findOneBy).toHaveBeenCalledWith({ pedidoId });
    });

    it('deve lançar exceção ao falhar ao encontrar produções', async () => {
        const error = new Error('Erro no banco de dados');
        (mockProducaoRepository.find as jest.Mock).mockRejectedValue(error);

        await expect(repository.find()).rejects.toThrow(error);
    });
});
