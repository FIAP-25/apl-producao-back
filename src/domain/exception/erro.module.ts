/* eslint-disable @typescript-eslint/no-useless-constructor */
import LibraryErrors from '@/domain/exception/error.lib.json';

/** Modelo de um erro
 * @param codigo Código
 * @param mensagem Mensagem
 * @param detalhes Detalhes
 */
export class ErroDetalhe {
    codigo?: string;
    mensagem?: string;
    detalhes?: string;
    fluxo?: string;
}

export class ErroBase extends Error {
    mensagem: string;
    detalhes: string;
    tipo: string;

    constructor(erro: keyof typeof LibraryErrors) {
        super(LibraryErrors[erro].mensagem);

        this.mensagem = LibraryErrors[erro].mensagem;

        this.detalhes = LibraryErrors[erro].mensagemDetalhe;

        this.tipo = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        // Error.captureStackTrace(this);
    }
}

export class ErroValidacao extends ErroBase {
    constructor(erro: keyof typeof LibraryErrors) {
        super(erro);
    }
}
export class ErroNegocio extends ErroBase {
    constructor(erro: keyof typeof LibraryErrors) {
        super(erro);
    }
}
export class ErroSistema extends ErroBase {
    constructor(erro: keyof typeof LibraryErrors) {
        super(erro);
    }
}
export class ErroConectividade extends ErroBase {
    constructor(erro: keyof typeof LibraryErrors) {
        super(erro);
    }
}
export class ErroAcesso extends ErroBase {
    constructor(erro: keyof typeof LibraryErrors) {
        super(erro);
    }
}

export type Erro = ErroValidacao | ErroNegocio | ErroSistema | ErroConectividade | ErroAcesso;
