# Caso de Uso: Buscar Perguntas por Palavra-chave


## Nome do caso de uso

Buscar perguntas por palavra-chave.

## Objetivo

Permitir que o usuário localize perguntas cadastradas no ESM Forum por
meio de uma palavra ou expressão informada no campo de pesquisa.

## Atores

### Ator principal

Usuário do fórum.

### Atores secundários

- Frontend React;
- API do ESM Forum;
- Banco de dados SQLite.

## Pré-condições

- O backend do ESM Forum deve estar em execução;
- O frontend deve estar disponível para o usuário;
- A comunicação entre frontend e backend deve estar funcionando;
- O banco de dados deve estar acessível;
- A página principal do fórum deve ter sido carregada.

## Gatilho

O caso de uso começa quando o usuário informa uma palavra no campo de
busca e solicita a pesquisa.

## Fluxo principal

1. O sistema apresenta a página principal do ESM Forum.
2. O sistema exibe o campo de busca por palavra-chave.
3. O usuário informa uma palavra ou expressão.
4. O usuário confirma a pesquisa.
5. O frontend envia a palavra-chave para a API do ESM Forum.
6. A API verifica se o termo informado é válido.
7. A API solicita ao banco de dados as perguntas que contêm o termo.
8. O banco de dados realiza a consulta.
9. O banco de dados retorna as perguntas correspondentes.
10. A API envia os resultados ao frontend.
11. O frontend apresenta somente as perguntas encontradas.
12. O caso de uso é encerrado com sucesso.

## Fluxo alternativo 1 — Nenhuma pergunta encontrada

1. O fluxo começa após o usuário confirmar a pesquisa.
2. O banco de dados não encontra perguntas que contenham o termo.
3. A API retorna uma lista vazia ao frontend.
4. O frontend exibe a mensagem:

```text
Nenhuma pergunta foi encontrada.
```

5. O usuário pode informar outra palavra-chave.
6. O caso de uso retorna ao passo 3 do fluxo principal.

## Fluxo alternativo 2 — Campo de busca vazio

1. O usuário confirma a pesquisa sem informar uma palavra-chave.
2. O frontend identifica que o campo está vazio.
3. O sistema não envia uma solicitação de busca para a API.
4. O frontend exibe a mensagem:

```text
Informe uma palavra-chave para realizar a busca.
```

5. O usuário pode preencher o campo.
6. O caso de uso retorna ao passo 3 do fluxo principal.

## Fluxo alternativo 3 — Falha na comunicação

1. O frontend envia a solicitação de busca para a API.
2. Ocorre uma falha na comunicação ou no acesso ao banco de dados.
3. A API retorna uma resposta de erro, quando possível.
4. O frontend exibe a mensagem:

```text
Não foi possível realizar a busca. Tente novamente.
```

5. Nenhuma alteração é realizada no banco de dados.
6. O caso de uso é encerrado sem sucesso.

## Regras de negócio

- A busca deve considerar o texto das perguntas;
- A pesquisa não deve alterar os dados cadastrados;
- O resultado deve apresentar apenas perguntas relacionadas ao termo;
- O sistema deve aceitar uma palavra ou uma expressão;
- Espaços desnecessários no início e no final devem ser desconsiderados;
- Uma busca sem resultados deve apresentar uma mensagem informativa.

## Pós-condições de sucesso

- As perguntas correspondentes são exibidas ao usuário;
- Os dados armazenados no banco permanecem inalterados;
- O usuário pode selecionar uma pergunta encontrada;
- O usuário pode realizar uma nova pesquisa.

## Pós-condições de falha

- Nenhuma pergunta incorreta é apresentada como resultado;
- Nenhuma informação do banco de dados é modificada;
- O sistema informa ao usuário que a busca não pôde ser concluída.

## Critérios relacionados

Este caso de uso atende aos seguintes critérios da história de usuário:

- Existência de um campo de busca na página principal;
- Pesquisa pelo texto das perguntas;
- Exibição somente das perguntas correspondentes;
- Mensagem quando nenhuma pergunta for encontrada;
- Validação do campo de pesquisa vazio.