const EstrategiaBusca = require('./EstrategiaBusca');

class BuscaPorPalavraChave extends EstrategiaBusca {
  constructor(perguntaRepository) {
    super();
    this.perguntaRepository = perguntaRepository;
  }

  buscar(termo) {
    return this.perguntaRepository.buscarPorTexto(termo);
  }
}

module.exports = BuscaPorPalavraChave;