import { AxiosClient } from '@/infrastructure/client/axios.client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosClient', () => {
    let axiosClient: AxiosClient;
    const urlBasePedido = 'http://localhost/api';

    beforeEach(() => {
        process.env.URL_BASE = urlBasePedido;
        axiosClient = new AxiosClient();
    });

    it('deve fazer uma chamada GET corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        mockedAxios.get.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('get', '/caminho', null);

        expect(mockedAxios.get).toHaveBeenCalledWith(`${urlBasePedido}/caminho`);
        expect(response).toEqual(mockResponse);
    });

    it('deve fazer uma chamada POST corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        mockedAxios.post.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('post', '/caminho', { chave: 'valor' });

        expect(mockedAxios.post).toHaveBeenCalledWith(`${urlBasePedido}/caminho`, { chave: 'valor' });
        expect(response).toEqual(mockResponse);
    });

    it('deve fazer uma chamada PUT corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        mockedAxios.put.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('put', '/caminho', { chave: 'valor' });

        expect(mockedAxios.put).toHaveBeenCalledWith(`${urlBasePedido}/caminho`, { chave: 'valor' });
        expect(response).toEqual(mockResponse);
    });

    it('deve fazer uma chamada PATCH corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        mockedAxios.patch.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('patch', '/caminho', { chave: 'valor' });

        expect(mockedAxios.patch).toHaveBeenCalledWith(`${urlBasePedido}/caminho`, { chave: 'valor' });
        expect(response).toEqual(mockResponse);
    });

    it('deve fazer uma chamada DELETE corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        mockedAxios.delete.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('delete', '/caminho', {});

        expect(mockedAxios.delete).toHaveBeenCalledWith(`${urlBasePedido}/caminho`);
        expect(response).toEqual(mockResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
