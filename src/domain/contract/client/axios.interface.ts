type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export abstract class IAxiosClient {
    abstract executarChamada(api: 'pedido', method: HttpMethod, url: string, body: any): Promise<any>;
}
