class BuscaController {
  constructor(buscaService) {
    this.buscaService = buscaService;
  }

  buscarPerguntas(req, res) {
    try {
      const termo = req.query.termo;
      const perguntas = this.buscaService.buscar(termo);

      res.status(200).json(perguntas);
    } catch (erro) {
      res.status(400).json({
        erro: erro.message
      });
    }
  }
}

module.exports = BuscaController;