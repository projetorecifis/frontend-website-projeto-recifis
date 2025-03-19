/**
 * Classe que representa uma falha como tratamento de resultados.
 *
 * @typeparam S - O tipo de sucesso (pode ser qualquer tipo).
 * @typeparam F - O tipo de falha (pode ser qualquer tipo).
 */
export class Failure<F, S> {
    readonly value: F

    /**
     * Cria uma instância de Failure com o valor de falha especificado.
     *
     * @param value - O valor que descreve a falha.
     */
    constructor(value: F) {
      this.value = value
    }

    /**
     * Verifica se este resultado é um sucesso.
     *
     * @returns `false` porque esta instância é uma falha
     */
    isSuccess = (): this is Success<F, S> => false

    /**
     * Verifica se este resultado é uma falha.
     *
     * @returns `true` porque esta instância é uma falha.
     */
    isFailure = (): this is Failure<F, S> => true
  }

  /**
 * Classe que representa um sucesso como tratamento de resultados.
 *
 * @typeparam S - O tipo de sucesso (pode ser qualquer tipo).
 * @typeparam F - O tipo de falha (pode ser qualquer tipo).
 */
  export class Success<F, S> {
    readonly value: S

    /**
     * Cria uma instância de Sucesso com o valor de sucesso especificado.
     *
     * @param value - O valor que descreve o sucesso.
     */
    constructor(value: S) {
      this.value = value
    }

    /**
     * Verifica se este resultado é um sucesso.
     *
     * @returns `true` porque esta instância é um sucesso.
     */
    isSuccess = (): this is Success<F, S> => true

    /**
     * Verifica se este resultado é um falha.
     *
     * @returns `false` porque esta instância é um sucesso.
     */
    isFailure = (): this is Failure<F, S> => false
  }

  export type FailureOrSuccess<F, S> = Failure<F, S> | Success<F, S>

  export const failure = <F, S>(value: F): FailureOrSuccess<F, S> => {
    return new Failure(value)
  }

  export const success = <F, S>(value: S): FailureOrSuccess<F, S> => {
    return new Success(value)
  }

