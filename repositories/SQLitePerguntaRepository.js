const PerguntaRepository = require('./PerguntaRepository');
const bd = require('../bd/bd_utils');

class SQLitePerguntaRepository extends PerguntaRepository {
  buscarPorTexto(termo) {
    const termoBusca = `%${termo}%`;

    return bd.queryAll(
      `SELECT
        p.id_pergunta,
        p.texto,
        COUNT(r.id_resposta) AS num_respostas
      FROM perguntas p
      LEFT JOIN respostas r ON r.id_pergunta = p.id_pergunta
      WHERE LOWER(p.texto) LIKE LOWER(?)
      GROUP BY p.id_pergunta, p.texto
      ORDER BY p.id_pergunta DESC`,
      [termoBusca]
    );
  }
}

module.exports = SQLitePerguntaRepository;