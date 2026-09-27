class BuscaService {
  constructor(estrategiaBusca) {
    this.estrategiaBusca = estrategiaBusca;
  }

  buscar(termo) {
    if (typeof termo !== 'string' || !termo.trim()) {
      throw new Error('Informe uma palavra-chave para realizar a busca.');
    }

    return this.estrategiaBusca.buscar(termo.trim());
  }
}

module.exports = BuscaService;