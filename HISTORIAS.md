# Histórias de Usuário do ESM Forum

## Introdução

Este documento apresenta três histórias de usuário relacionadas às
funcionalidades planejadas para o sistema ESM Forum.

Cada história descreve uma necessidade do usuário, o benefício esperado
e os critérios de aceitação que serão utilizados para verificar se a
funcionalidade foi concluída.

## História 1 — Busca por palavra-chave

**Como** usuário do fórum,  
**Eu quero** pesquisar perguntas utilizando uma palavra-chave,  
**Para** encontrar rapidamente conteúdos relacionados à minha dúvida.

### Critérios de aceitação

- A página principal deve possuir um campo de busca;
- O usuário deve conseguir informar uma ou mais palavras;
- O sistema deve pesquisar no texto das perguntas;
- O sistema deve exibir somente as perguntas correspondentes;
- Quando não existirem resultados, o sistema deve apresentar uma
  mensagem informativa.

### Prioridade

**Alta**

## História 2 — Categorização por tags

**Como** usuário do fórum,  
**Eu quero** associar uma categoria ou tag a uma pergunta,  
**Para** organizar o conteúdo e facilitar a localização de assuntos
relacionados.

### Critérios de aceitação

- O sistema deve disponibilizar categorias como tecnologia, carreira e
  dúvidas-gerais;
- O usuário deve selecionar uma categoria ao cadastrar uma pergunta;
- A categoria deve aparecer junto ao texto da pergunta;
- O sistema deve permitir filtrar perguntas por categoria;
- A categoria selecionada deve ser armazenada no banco de dados.

### Prioridade

**Alta**

## História 3 — Votação em perguntas

**Como** usuário do fórum,  
**Eu quero** votar positiva ou negativamente em uma pergunta,  
**Para** ajudar a comunidade a identificar conteúdos mais relevantes.

### Critérios de aceitação

- Cada pergunta deve apresentar opções de upvote e downvote;
- O sistema deve exibir o saldo de votos da pergunta;
- Um usuário não deve votar mais de uma vez na mesma pergunta;
- O usuário deve conseguir alterar seu voto;
- O saldo deve ser atualizado após o registro do voto.

### Prioridade

**Média**

## Ordem de prioridade

As histórias foram organizadas nesta ordem:

| Ordem | História | Prioridade |
|------:|----------|------------|
| 1 | Busca por palavra-chave | Alta |
| 2 | Categorização por tags | Alta |
| 3 | Votação em perguntas | Média |

## Justificativa

A busca por palavra-chave recebeu a primeira posição porque oferece um
benefício imediato aos usuários. Ela permite localizar perguntas já
cadastradas e pode evitar a publicação de dúvidas repetidas.

A categorização por tags ficou na segunda posição porque melhora a
organização do fórum e complementa a busca. Entretanto, ela exige
alterações no banco de dados, no cadastro e na exibição das perguntas.

A votação ficou na terceira posição porque depende de um controle mais
detalhado dos usuários e dos votos registrados. Apesar de ser relevante,
ela não é indispensável para o funcionamento inicial da busca e da
organização das perguntas.

## Definição de conclusão

Uma história será considerada concluída quando:

- Todos os critérios de aceitação forem atendidos;
- O backend responder corretamente;
- A interface funcionar sem erros;
- Os dados forem armazenados quando necessário;
- Os testes da funcionalidade forem executados;
- O código e a documentação forem enviados ao GitHub.