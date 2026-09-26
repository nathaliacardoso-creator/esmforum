# Análise de Design Simples

## Identificação

**Aluna:** Nathalia Cardoso
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Engenharia de Software 

## Introdução

Esta análise apresenta aspectos do código do backend do ESM Forum
relacionados à prática de Design Simples da metodologia Extreme
Programming.

Um dos princípios relacionados ao Design Simples é o YAGNI, sigla para
"You Aren't Gonna Need It", que pode ser traduzida como "você não vai
precisar disso".

O princípio recomenda que funcionalidades, estruturas e abstrações
sejam implementadas somente quando forem realmente necessárias. Dessa
forma, evita-se criar código complexo baseado apenas em necessidades
futuras que talvez nunca ocorram.

## Organização encontrada no projeto

Na versão analisada do ESM Forum, as rotas estão implementadas
diretamente no arquivo `server.js`, enquanto as operações relacionadas
às perguntas, respostas e banco de dados estão principalmente nos
arquivos `modelo.js` e `bd/bd_utils.js`.

Embora o enunciado mencione os arquivos `routes/perguntas.js` e
`routes/respostas.js`, esses arquivos não estão presentes na versão
analisada. Por isso, foram analisados os arquivos equivalentes existentes.

## Aspectos que seguem o Design Simples

### 1. Quantidade reduzida de rotas

O arquivo `server.js` contém apenas as rotas necessárias para as
funcionalidades atuais do sistema:

```javascript
app.get('/', (req, res) => {
  const perguntas = modelo.listar_perguntas();
  res.send(perguntas);
});

app.post('/perguntas', (req, res) => {
  const id_pergunta = modelo.cadastrar_pergunta(req.body.pergunta);
  res.json({ id_pergunta: id_pergunta });
});
```

O sistema não implementa antecipadamente autenticação, permissões,
notificações ou outras funcionalidades que ainda não fazem parte do
escopo atual.

Isso está de acordo com o YAGNI, pois o projeto mantém somente o código
necessário para listar e cadastrar perguntas e respostas.

### 2. Funções pequenas e objetivas

As funções do arquivo `modelo.js` possuem responsabilidades simples e
diretas. A função `get_respostas`, por exemplo, apenas consulta as
respostas relacionadas a uma pergunta:

```javascript
function get_respostas(id_pergunta) {
  return bd.queryAll(
    'select * from respostas where id_pergunta = ?',
    [id_pergunta]
  );
}
```

Não existem validações ou abstrações desnecessárias dentro dessa função.
Ela executa somente a operação exigida pelo sistema.

### 3. Banco de dados adequado ao projeto

O ESM Forum utiliza SQLite e possui tabelas simples para perguntas e
respostas.

Essa decisão está de acordo com o Design Simples porque o projeto possui
objetivo didático e não necessita, neste momento, de uma infraestrutura
complexa de banco de dados.

A utilização de microsserviços, banco distribuído ou servidores externos
aumentaria a complexidade sem apresentar uma necessidade atual.

### 4. Separação básica do acesso ao banco

O arquivo `bd/bd_utils.js` contém funções genéricas para consultar e
alterar o banco:

```javascript
function queryAll(query, params) {
  return bd.prepare(query).all(params);
}

function exec(statement, params) {
  return bd.prepare(statement).run(params);
}
```

Essa separação evita repetir a configuração do SQLite em todas as
operações do sistema e mantém o código relativamente simples.

## Oportunidades de simplificação

### 1. Melhorar o tratamento de erro

Na rota que consulta respostas, algumas operações podem acontecer antes
do bloco `try`. Caso uma consulta ao banco apresente erro, ela pode não
ser tratada corretamente.

Uma organização mais simples e segura seria colocar toda a operação
dentro do bloco:

```javascript
app.get('/respostas/:id_pergunta', (req, res) => {
  try {
    const id_pergunta = req.params.id_pergunta;
    const pergunta = modelo.get_pergunta(id_pergunta);
    const respostas = modelo.get_respostas(id_pergunta);

    res.json({
      pergunta: pergunta,
      respostas: respostas
    });
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});
```

Assim, todas as possíveis falhas da rota são tratadas no mesmo local.

### 2. Evitar múltiplas consultas ao banco

A função `listar_perguntas` consulta todas as perguntas e depois executa
uma nova consulta para contar as respostas de cada pergunta:

```javascript
function listar_perguntas() {
  const perguntas = bd.queryAll('select * from perguntas', []);

  perguntas.forEach(pergunta =>
    pergunta['num_respostas'] =
      get_num_respostas(pergunta['id_pergunta'])
  );

  return perguntas;
}
```

Esse código é simples para a quantidade atual de dados, mas pode executar
muitas consultas caso o número de perguntas aumente.

Uma oportunidade de melhoria seria utilizar uma única consulta com
`LEFT JOIN`, `COUNT` e `GROUP BY`. Entretanto, essa alteração deve ser
realizada somente quando houver necessidade comprovada, respeitando o
princípio YAGNI.

### 3. Validar textos vazios

Atualmente, as rotas podem receber perguntas ou respostas sem conteúdo.
Uma validação pequena poderia impedir o cadastro de textos vazios:

```javascript
if (!req.body.pergunta || !req.body.pergunta.trim()) {
  return res.status(400).json({
    erro: 'O texto da pergunta é obrigatório.'
  });
}
```

Essa validação atende a uma necessidade real e não adiciona complexidade
excessiva.

### 4. Remover dependências não utilizadas

Durante a instalação, foi identificado que o projeto possuía as
dependências `sqlite3` e `better-sqlite3`, mas o arquivo `bd/bd_utils.js`
utiliza somente `better-sqlite3`.

A dependência `sqlite3` foi removida porque não era utilizada e causava
problemas de instalação. Essa alteração segue o YAGNI, pois remove uma
dependência desnecessária em vez de manter código para uma possível
necessidade futura.

## Conclusão

O backend do ESM Forum segue o Design Simples em diferentes pontos:
possui poucas rotas, funções objetivas, uma estrutura pequena de banco
de dados e somente as funcionalidades necessárias para o objetivo atual.

As oportunidades de melhoria identificadas são o tratamento de erros,
a validação das entradas e a redução de consultas repetidas ao banco.

As mudanças devem ser feitas de maneira incremental, evitando criar
abstrações ou funcionalidades que ainda não sejam necessárias.