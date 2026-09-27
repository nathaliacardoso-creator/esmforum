# Análise dos Princípios SOLID no ESM Forum

## Introdução

Este documento analisa a aplicação dos princípios SOLID no backend do
ESM Forum. A análise considera principalmente os arquivos `server.js`,
`modelo.js` e `bd/bd_utils.js`.

SOLID é um conjunto de princípios utilizado para organizar o código de
forma mais compreensível, flexível e fácil de manter.

## Pontos positivos

### 1. Separação entre rotas e regras de dados

O arquivo `server.js` recebe as requisições HTTP e encaminha as
operações para funções presentes no arquivo `modelo.js`.

Exemplo:

```javascript
app.get('/', (req, res) => {
  const perguntas = modelo.listar_perguntas();
  res.send(perguntas);
});
```

Nesse trecho, a rota não contém diretamente a consulta ao banco de
dados. Ela delega a operação para `modelo.listar_perguntas()`.

Esse aspecto está relacionado ao princípio de Responsabilidade Única
(SRP), pois cada arquivo possui uma responsabilidade predominante:

- `server.js`: lidar com requisições e respostas HTTP;
- `modelo.js`: concentrar operações relacionadas ao domínio;
- `bd/bd_utils.js`: executar operações de acesso ao banco.

Essa separação facilita compreender onde cada alteração deve ser feita.

### 2. Reutilização das funções de banco de dados

O arquivo `bd/bd_utils.js` disponibiliza funções genéricas para executar
consultas e alterações no banco de dados.

Exemplo:

```javascript
function queryAll(query, params) {
  return bd.prepare(query).all(params);
}

function exec(statement, params) {
  return bd.prepare(statement).run(params);
}
```

Essas funções evitam duplicar a configuração e a execução do SQLite em
vários pontos do sistema.

Esse trecho demonstra uma aplicação parcial do princípio DRY, que evita
repetição de código, e contribui para o SRP, pois o módulo de banco é
responsável somente pelo acesso aos dados.

### 3. Funções pequenas no modelo

No arquivo `modelo.js`, funções como `get_respostas` possuem um objetivo
específico: buscar as respostas de uma pergunta.

Exemplo:

```javascript
function get_respostas(id_pergunta) {
  return bd.queryAll(
    'select * from respostas where id_pergunta = ?',
    [id_pergunta]
  );
}
```

Essa função não controla a interface, não processa requisições HTTP e
não contém regras que não estejam relacionadas à busca de respostas.

O trecho segue o princípio de Responsabilidade Única (SRP), pois a
função realiza uma tarefa clara e limitada.

## Oportunidades de melhoria

### 1. Dependência direta de `modelo.js` em `bd/bd_utils.js`

O arquivo `modelo.js` importa diretamente a implementação concreta do
acesso ao banco de dados:

```javascript
const bd = require('./bd/bd_utils');
```

Essa dependência torna o modelo ligado diretamente ao SQLite. Caso o
projeto passe a usar outro banco de dados, como PostgreSQL, várias partes
de `modelo.js` podem precisar ser modificadas.

Esse ponto pode ser melhorado com o princípio da Inversão de
Dependência (DIP). Em vez de depender diretamente de `bd/bd_utils.js`,
a lógica poderia depender de uma abstração, como uma interface ou
contrato de repositório.

Exemplo de proposta:

```javascript
class PerguntaRepository {
  buscarPorTermo(termo) {
    throw new Error('Método deve ser implementado.');
  }
}
```

Uma implementação concreta, como `SQLitePerguntaRepository`, receberia
a responsabilidade de acessar o SQLite. Assim, um repositório diferente
poderia ser utilizado sem alterar a regra de negócio.

### 2. Função `listar_perguntas` reúne mais de uma responsabilidade

A função `listar_perguntas` busca as perguntas e também calcula a
quantidade de respostas para cada pergunta.

Exemplo:

```javascript
function listar_perguntas() {
  const perguntas = bd.queryAll('select * from perguntas', []);

  perguntas.forEach(pergunta => {
    pergunta.num_respostas =
      get_num_respostas(pergunta.id_pergunta);
  });

  return perguntas;
}
```

A função mistura a consulta das perguntas com a montagem de informações
adicionais para exibição. Isso pode dificultar alterações futuras e
aumentar o número de consultas ao banco.

Esse trecho pode ser melhorado aplicando o SRP. Uma alternativa seria
deixar o repositório responsável por recuperar os dados e criar um
serviço responsável por preparar a lista para a interface.

Exemplo de proposta:

```javascript
function listarPerguntasComRespostas(perguntaRepository) {
  const perguntas = perguntaRepository.listar();

  return perguntas.map(pergunta => ({
    ...pergunta,
    num_respostas: perguntaRepository.contarRespostas(
      pergunta.id_pergunta
    )
  }));
}
```

## Conclusão

O backend atual possui uma estrutura simples e já apresenta uma divisão
básica entre rotas, modelo e acesso ao banco de dados.

As principais oportunidades de evolução estão na redução da dependência
direta entre a lógica do sistema e o SQLite, além da separação de
operações que hoje estão concentradas em uma única função.

Na próxima tarefa, a funcionalidade de busca por palavra-chave será
implementada com módulos separados, abstrações de repositório e uma
estratégia de busca extensível.