# Implementação da Busca por Palavra-chave com SOLID

## Funcionalidade implementada

A funcionalidade implementada foi a busca de perguntas por palavra-chave
no backend do ESM Forum.

A busca foi disponibilizada por meio da rota:

```text
GET /perguntas/busca?termo=palavra
```

Essa rota recebe um termo informado pelo usuário, valida o conteúdo
recebido e retorna uma lista de perguntas compatíveis com o texto
pesquisado.

## Objetivo da implementação

A implementação teve como objetivo adicionar uma nova funcionalidade ao
sistema aplicando os princípios SOLID solicitados no enunciado:

- SRP (Single Responsibility Principle);
- DIP (Dependency Inversion Principle);
- OCP (Open/Closed Principle).

## Estrutura criada

Para implementar a funcionalidade, foram criados os seguintes módulos:

### 1. Controller

Arquivo:

```text
controllers/BuscaController.js
```

Responsabilidade:

- Receber a requisição HTTP;
- Obter o valor de `req.query.termo`;
- Chamar o serviço de busca;
- Retornar a resposta JSON;
- Tratar erros de validação.

Trecho:

```javascript
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
```

### 2. Service

Arquivo:

```text
services/BuscaService.js
```

Responsabilidade:

- Validar o termo informado;
- Remover espaços desnecessários;
- Acionar a estratégia de busca.

Trecho:

```javascript
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
```

### 3. Estratégia de busca

Arquivos:

```text
strategies/EstrategiaBusca.js
strategies/BuscaPorPalavraChave.js
```

Responsabilidade:

- Definir uma abstração para busca;
- Implementar a busca específica por palavra-chave.

Trecho da abstração:

```javascript
class EstrategiaBusca {
  buscar(termo) {
    throw new Error('O método buscar deve ser implementado.');
  }
}
```

Trecho da implementação:

```javascript
class BuscaPorPalavraChave extends EstrategiaBusca {
  constructor(perguntaRepository) {
    super();
    this.perguntaRepository = perguntaRepository;
  }

  buscar(termo) {
    return this.perguntaRepository.buscarPorTexto(termo);
  }
}
```

### 4. Repositório

Arquivos:

```text
repositories/PerguntaRepository.js
repositories/SQLitePerguntaRepository.js
```

Responsabilidade:

- Definir o contrato de acesso aos dados;
- Implementar a busca no banco SQLite.

Trecho da abstração:

```javascript
class PerguntaRepository {
  buscarPorTexto(termo) {
    throw new Error('O método buscarPorTexto deve ser implementado.');
  }
}
```

Trecho da implementação concreta:

```javascript
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
```

## Aplicação do SRP

O princípio da Responsabilidade Única foi aplicado por meio da divisão da
funcionalidade em módulos com papéis bem definidos.

- O controller trata apenas a comunicação HTTP;
- O service valida e coordena a regra de negócio;
- A estratégia representa o tipo de busca;
- O repositório realiza apenas o acesso ao banco.

Essa organização evita concentrar validação, regra de negócio, consulta
SQL e resposta HTTP em um único arquivo.

## Aplicação do DIP

O princípio da Inversão de Dependência foi aplicado ao fazer o serviço e
a estratégia dependerem de abstrações, e não diretamente de
implementações concretas.

Exemplos:

- `BuscaService` depende de uma estratégia de busca;
- `BuscaPorPalavraChave` depende de um repositório de perguntas;
- `PerguntaRepository` define o contrato de acesso a dados.

Com isso, a lógica principal não fica presa diretamente ao SQLite. Uma
nova implementação de repositório poderia ser criada futuramente sem
alterar a lógica do serviço.

## Aplicação do OCP

O princípio Aberto/Fechado foi aplicado com a criação da abstração
`EstrategiaBusca`.

A classe `BuscaService` trabalha com uma estratégia injetada no
construtor. Isso permite adicionar novos tipos de busca no futuro, como:

- Busca por tag;
- Busca por autor;
- Busca por data;
- Busca combinada.

Essas novas funcionalidades poderiam ser implementadas por novas classes
sem modificar o código principal do serviço.

## Integração com o servidor

A rota foi registrada no arquivo `server.js` por meio da criação dos
objetos necessários:

```javascript
const perguntaRepository = new SQLitePerguntaRepository();
const estrategiaBusca = new BuscaPorPalavraChave(perguntaRepository);
const buscaService = new BuscaService(estrategiaBusca);
const buscaController = new BuscaController(buscaService);

app.get('/perguntas/busca', (req, res) => {
  buscaController.buscarPerguntas(req, res);
});
```

Esse fluxo demonstra a montagem dos objetos e o encaminhamento da
requisição até a camada responsável.

## Resultado obtido

Foram realizados testes manuais da rota implementada.

### Teste 1 — termo vazio

Requisição:

```text
GET /perguntas/busca?termo=
```

Resultado:

- O sistema retornou erro 400;
- A mensagem informada foi:
  `Informe uma palavra-chave para realizar a busca.`

### Teste 2 — termo sem resultados

Requisição:

```text
GET /perguntas/busca?termo=teste
```

Resultado:

- O sistema retornou uma lista vazia `[]`;
- Isso indica que a busca foi executada corretamente e não encontrou
  perguntas correspondentes.

## Conclusão

A funcionalidade de busca por palavra-chave foi implementada com código
funcional e organizado em módulos distintos.

A solução aplicou SRP com a separação de responsabilidades, DIP com o
uso de abstrações e OCP com a possibilidade de extensão por novas
estratégias de busca.

Essa organização torna o código mais legível, mais fácil de manter e
mais preparado para futuras evoluções do sistema.