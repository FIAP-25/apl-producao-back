import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import axios from 'axios';

export class AxiosClient implements IAxiosClient {
    urlBasePedido = process.env.URL_BASE ?? '';
    async executarChamada(method: 'post' | 'get' | 'put' | 'patch' | 'delete', path: string, body: any): Promise<any> {
        const url = `${this.urlBasePedido}${path}`;
        console.log(url);
        switch (method) {
            case 'get':
                return axios.get(url);
            case 'post':
                return axios.post(url, body);
            case 'put':
                return axios.put(url, body);
            case 'patch':
                return axios.patch(url, body);
            case 'delete':
                return axios.delete(url);
            default:
                break;
        }
    }
}
