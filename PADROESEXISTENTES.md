# Padrões de Projeto Existentes no ESM Forum


## Introdução

Este documento apresenta padrões de projeto identificados no sistema
ESM Forum, considerando tanto o código original quanto a funcionalidade
de busca por palavra-chave implementada na Parte 3.

A análise mostra que alguns padrões já estavam presentes no projeto de
forma simples, enquanto outros passaram a aparecer com mais clareza após
a organização da nova funcionalidade.

## 1. Repository

### Onde está aplicado

O padrão Repository pode ser identificado na camada de acesso a dados.

Arquivos relacionados:

- `bd/bd_utils.js`
- `modelo.js`
- `repositories/PerguntaRepository.js`
- `repositories/SQLitePerguntaRepository.js`

### Como aparece no sistema

No código original, o arquivo `modelo.js` já concentrava operações
relacionadas ao acesso e manipulação de dados do domínio, funcionando de
forma parecida com um repositório, embora ainda misturasse algumas
responsabilidades.

Na implementação da busca, o padrão ficou mais explícito com a criação
de uma abstração `PerguntaRepository` e de uma implementação concreta
`SQLitePerguntaRepository`.

Exemplo:

```javascript
class PerguntaRepository {
  buscarPorTexto(termo) {
    throw new Error('O método buscarPorTexto deve ser implementado.');
  }
}
```

```javascript
class SQLitePerguntaRepository extends PerguntaRepository {
  buscarPorTexto(termo) {
    // consulta ao banco SQLite
  }
}
```

### Avaliação

O padrão está presente de forma **mais completa na nova funcionalidade**
de busca.

No código original, sua aplicação era apenas **parcial**, porque o
arquivo `modelo.js` ainda centraliza regras que poderiam ser separadas
em repositórios específicos por entidade.

### Possíveis melhorias

- Criar repositórios separados para perguntas, respostas e usuários;
- Reduzir a quantidade de lógica de dados concentrada em `modelo.js`;
- Padronizar o acesso ao banco por meio de interfaces e implementações
  concretas.

## 2. Strategy

### Onde está aplicado

O padrão Strategy foi identificado na funcionalidade de busca
implementada.

Arquivos relacionados:

- `strategies/EstrategiaBusca.js`
- `strategies/BuscaPorPalavraChave.js`
- `services/BuscaService.js`

### Como aparece no sistema

Foi criada uma abstração chamada `EstrategiaBusca`, que define o método
`buscar(termo)`. Depois, foi criada a classe
`BuscaPorPalavraChave`, que implementa esse comportamento.

Exemplo:

```javascript
class EstrategiaBusca {
  buscar(termo) {
    throw new Error('O método buscar deve ser implementado.');
  }
}
```

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

O `BuscaService` utiliza a estratégia recebida no construtor, sem
precisar conhecer os detalhes da implementação concreta.

### Avaliação

O padrão Strategy está presente de forma **clara e adequada** na nova
funcionalidade.

Sua implementação já permite extensão futura, pois novas estratégias de
busca podem ser adicionadas sem alteração da lógica principal do
serviço.

### Possíveis melhorias

- Criar novas estratégias reais, como busca por tag e busca por autor;
- Adicionar uma fábrica para selecionar a estratégia de busca conforme o
  tipo informado na requisição;
- Cobrir cada estratégia com testes automatizados específicos.

## 3. Controller

### Onde está aplicado

O padrão Controller aparece na forma como as requisições HTTP são
encaminhadas para módulos específicos do backend.

Arquivos relacionados:

- `server.js`
- `controllers/BuscaController.js`

### Como aparece no sistema

No código original, o próprio `server.js` exercia parcialmente o papel
de controller, recebendo requisições e chamando funções do modelo.

Com a implementação da busca, esse padrão passou a aparecer de maneira
mais explícita por meio da classe `BuscaController`, responsável por
intermediar a requisição e a resposta.

Exemplo:

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

### Avaliação

O padrão Controller está presente de forma **parcial no sistema
original** e de forma **mais organizada na nova funcionalidade**.

Ainda não existe uma separação completa de controllers para todas as
operações do sistema, pois várias rotas antigas continuam escritas
diretamente no `server.js`.

### Possíveis melhorias

- Criar controllers específicos para perguntas, respostas e usuários;
- Remover regras de controle do `server.js`;
- Deixar o `server.js` apenas como ponto de configuração das rotas.

## Conclusão

O sistema ESM Forum já apresenta indícios de padrões de projeto, mesmo
antes de uma arquitetura mais formal.

Os padrões identificados com mais clareza foram Repository, Strategy e
Controller.

Entre eles, o padrão Strategy está mais bem caracterizado na
funcionalidade implementada, enquanto Repository e Controller aparecem
de forma parcial no sistema original e podem ser fortalecidos com uma
organização mais modular do backend.