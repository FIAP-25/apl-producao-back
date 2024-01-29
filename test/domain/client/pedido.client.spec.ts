import { PedidoClient } from '@/domain/client/pedido.client';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PedidoClient', () => {
    let pedidoClient: PedidoClient;

    beforeEach(() => {
        pedidoClient = new PedidoClient();
        mockedAxios.post.mockClear();
    });

    it('deve fazer uma chamada POST', async () => {
        const mockResponse = { data: 'resposta_mockada' };
        mockedAxios.post.mockResolvedValue(mockResponse);

        await pedidoClient.save('123');

        expect(mockedAxios.post).toHaveBeenCalledWith('http://node_produto:4000/api/produtos', {
            descricao: 'string',
            nome: 'string',
            categoriaId: 'string',
            preco: 2
        });
    });
});
