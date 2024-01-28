export abstract class IPedidoClient {
    abstract save(pedidoId: string): Promise<any>;
}
