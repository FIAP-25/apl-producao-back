import { IPedidoClient } from './pedido.client.interface';

const axios = require('axios');

export class PedidoClient implements IPedidoClient {
    async save(pedidoId: string): Promise<any> {
        (async () => {
            await axios
                .post(`http://node_produto:4000/api/produtos`, {
                    descricao: 'string',
                    nome: 'string',
                    categoriaId: 'string',
                    preco: 2
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })();
    }
}
