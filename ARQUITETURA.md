# Análise da Arquitetura Atual do ESM Forum


## Introdução

Este documento apresenta uma análise da arquitetura atual do sistema
ESM Forum, considerando sua organização geral, as camadas existentes e a
forma de comunicação entre frontend, backend e banco de dados.

O sistema estudado possui uma estrutura web dividida em frontend e
backend, com persistência local em banco SQLite.

## Identificação da arquitetura

A arquitetura atual do ESM Forum segue principalmente o estilo
cliente-servidor.

Nesse modelo, o frontend executado no navegador atua como cliente,
enquanto o backend em Node.js com Express atua como servidor responsável
por processar requisições e acessar os dados do sistema.

Além disso, o backend apresenta uma organização próxima de uma
arquitetura em camadas, mesmo que ainda simplificada.

É possível identificar, de forma geral, as seguintes separações:

- Camada de apresentação;
- Camada de lógica de negócio;
- Camada de dados.

Essa divisão ainda não está completamente formalizada em todos os
arquivos, mas já pode ser observada na estrutura do projeto e ficou mais
evidente com a funcionalidade de busca implementada na Parte 3.

## Camadas existentes

### 1. Camada de apresentação

A camada de apresentação é composta principalmente pelo frontend em
React, responsável por exibir a interface para o usuário.

No backend, também existe uma parte de apresentação no sentido de expor
as rotas HTTP e devolver respostas em JSON.

Responsabilidades dessa camada:

- Receber ações do usuário;
- Exibir listas de perguntas e respostas;
- Enviar requisições ao backend;
- Apresentar os dados recebidos.

### 2. Camada de negócio

A camada de negócio concentra as regras da aplicação.

No sistema original, parte dessa lógica aparece em `modelo.js`. Na
funcionalidade implementada de busca, essa camada ficou mais clara com o
uso de `BuscaService` e da estratégia de busca.

Responsabilidades dessa camada:

- Validar entradas;
- Aplicar regras da funcionalidade;
- Coordenar o fluxo entre controller, estratégia e acesso a dados.

### 3. Camada de dados

A camada de dados é responsável por acessar e persistir informações no
banco SQLite.

No projeto original, isso aparece em arquivos como `bd/bd_utils.js` e
em funções do modelo. Na funcionalidade de busca, essa camada foi
organizada com `PerguntaRepository` e `SQLitePerguntaRepository`.

Responsabilidades dessa camada:

- Executar consultas SQL;
- Buscar perguntas e respostas;
- Persistir informações;
- Isolar o acesso ao banco de dados.

## Comunicação entre frontend e backend

O frontend e o backend se comunicam por meio de requisições HTTP.

O frontend React envia requisições para rotas expostas pelo backend em
Express, e o backend responde normalmente em formato JSON.

Esse modelo é adequado para aplicações web separadas em cliente e
servidor, pois permite desacoplamento entre interface e processamento de
dados.

Na funcionalidade de busca implementada, por exemplo, o fluxo ocorre da
seguinte forma:

1. O usuário informa uma palavra-chave no frontend;
2. O frontend envia uma requisição HTTP para o backend;
3. O backend recebe a requisição na rota `/perguntas/busca`;
4. O controller encaminha para o service;
5. O service utiliza a estratégia de busca;
6. A estratégia consulta o repositório;
7. O repositório acessa o banco SQLite;
8. O resultado retorna até o frontend em formato JSON.

## Diagrama arquitetural

Arquivo-fonte: `diagramaarquitetura.mmd`  
Imagem: `diagramaarquitetura.png`

O diagrama representa os principais componentes do sistema, suas
camadas e o fluxo de dados entre usuário, frontend, backend e banco.

## Pontos positivos da arquitetura atual

A arquitetura atual apresenta aspectos positivos importantes:

- Separação entre frontend e backend;
- Uso de HTTP/JSON para comunicação;
- Estrutura simples, adequada ao porte didático do sistema;
- Possibilidade de evolução para camadas mais bem definidas.

Além disso, a implementação da busca por palavra-chave mostrou que o
sistema pode evoluir de uma estrutura mais centralizada para uma
organização mais modular.

## Limitações observadas

Apesar de funcional, a arquitetura atual ainda apresenta limitações.

Algumas responsabilidades continuam concentradas em poucos arquivos,
como `server.js` e `modelo.js`, o que dificulta a manutenção e a
escalabilidade.

Também não há uma separação arquitetural completamente padronizada para
todas as funcionalidades, já que apenas parte do sistema segue uma
organização mais clara em controller, service e repository.

## Conclusão

O ESM Forum adota uma arquitetura cliente-servidor com características
de arquitetura em camadas.

A camada de apresentação está no frontend React e nas rotas do backend,
a lógica de negócio aparece nas regras e serviços do sistema, e a camada
de dados está no acesso ao banco SQLite.

Embora a estrutura atual ainda seja simples e parcialmente centralizada,
ela já oferece base suficiente para evoluir para uma arquitetura mais
modular, organizada e aderente a boas práticas de engenharia de
software.