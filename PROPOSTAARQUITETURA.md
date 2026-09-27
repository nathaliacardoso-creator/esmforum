# Proposta de Organização Arquitetural para o ESM Forum

## Introdução

Este documento apresenta uma proposta de organização arquitetural para o
backend do ESM Forum, com foco em boas práticas de separação em camadas
e aplicação do padrão MVC.

A proposta considera tanto a funcionalidade de busca por palavra-chave
implementada na Parte 3 quanto outras funcionalidades previstas no
projeto, como cadastro de respostas e notificações.

O objetivo é tornar o sistema mais organizado, modular, manutenível e
preparado para evolução futura.

## 1. Proposta de separação em camadas

A organização sugerida para o backend é baseada em três camadas
principais:

- Camada de apresentação;
- Camada de negócio;
- Camada de dados.

Essa separação permite distribuir responsabilidades de forma clara e
reduzir o acoplamento entre os componentes.

### 1.1 Camada de apresentação

A camada de apresentação seria responsável pela entrada e saída das
requisições HTTP.

Nessa camada ficariam:

- `routes/`
- `controllers/`

#### Responsabilidades específicas

- Receber requisições HTTP do frontend;
- Extrair parâmetros, corpo e query string;
- Acionar os serviços adequados;
- Retornar respostas JSON com status apropriado.

#### Exemplos de módulos

- `BuscaController`
- `RespostaController`
- `PerguntaController`

Essa camada não deve conter regras de negócio complexas nem consultas
SQL diretamente.

### 1.2 Camada de negócio

A camada de negócio seria responsável pelas regras da aplicação.

Nessa camada ficariam:

- `services/`
- `strategies/`
- validadores e classes de regra de negócio

#### Responsabilidades específicas

- Validar dados recebidos;
- Aplicar regras da aplicação;
- Coordenar o fluxo entre controllers e repositórios;
- Escolher estratégias adequadas para cada funcionalidade.

#### Exemplos de módulos

- `BuscaService`
- `RespostaService`
- `NotificacaoService`
- `BuscaPorPalavraChave`

Essa camada deve representar o comportamento do sistema e não depender
da interface HTTP.

### 1.3 Camada de dados

A camada de dados seria responsável pelo acesso ao banco e pela
persistência das informações.

Nessa camada ficariam:

- `repositories/`
- módulos de acesso ao SQLite
- modelos de domínio ligados à persistência

#### Responsabilidades específicas

- Executar consultas SQL;
- Salvar e recuperar registros;
- Isolar o acesso ao banco;
- Permitir substituição futura da tecnologia de persistência.

#### Exemplos de módulos

- `PerguntaRepository`
- `SQLitePerguntaRepository`
- `RespostaRepository`
- `bd/bd_utils.js`

Essa camada não deve conhecer detalhes da interface do usuário nem
respostas HTTP.

### 1.4 Comunicação entre as camadas

O fluxo recomendado seria:

1. O frontend envia uma requisição;
2. A rota direciona para um controller;
3. O controller chama um service;
4. O service aplica regras e usa repositórios;
5. O repositório acessa o banco;
6. O resultado retorna em sentido inverso até o cliente.

Esse fluxo evita mistura de responsabilidades e facilita testes,
manutenção e expansão do sistema.

## 2. Diagrama da proposta em camadas

Arquivo-fonte: `diagramacamadasproposta.mmd`  
Imagem: `diagramacamadasproposta.png`

O diagrama representa a separação entre apresentação, negócio e dados,
mostrando também os principais módulos sugeridos em cada camada.

## 3. Proposta de aplicação do padrão MVC

Além da separação em camadas, o backend pode ser reorganizado com base
no padrão MVC.

Nesse contexto:

- **Model** representa os dados e o acesso à persistência;
- **View** representa a estrutura de saída enviada ao cliente, neste
  caso principalmente JSON;
- **Controller** recebe a requisição, coordena o fluxo e chama os
  componentes necessários.

### 3.1 Funcionalidade 1 — Busca de perguntas

#### Model

Na funcionalidade de busca, o Model seria composto por:

- `PerguntaRepository`
- `SQLitePerguntaRepository`
- entidades ligadas à pergunta

Esse conjunto seria responsável por recuperar os dados das perguntas no
banco de dados.

#### View

A View seria a resposta JSON devolvida para o frontend com a lista de
perguntas encontradas.

Exemplo:

```json
[
  {
    "id_pergunta": 1,
    "texto": "Como usar JavaScript?",
    "num_respostas": 2
  }
]
```

#### Controller

O controller seria `BuscaController`, responsável por:

- receber o termo pesquisado;
- acionar o `BuscaService`;
- devolver a resposta ao cliente.

#### Fluxo completo

1. O usuário informa o termo de busca;
2. O frontend envia requisição para `/perguntas/busca`;
3. O `BuscaController` recebe a requisição;
4. O `BuscaService` valida o termo;
5. O repositório consulta o banco;
6. O controller retorna o JSON ao frontend.

### 3.2 Funcionalidade 2 — Cadastro de respostas

#### Model

Na funcionalidade de cadastro de respostas, o Model seria composto por:

- `RespostaRepository`
- entidade `Resposta`
- componentes de persistência associados

Esse conjunto cuidaria do salvamento e recuperação de respostas.

#### View

A View seria a resposta JSON indicando sucesso no cadastro ou contendo
os dados da resposta criada.

Exemplo:

```json
{
  "mensagem": "Resposta cadastrada com sucesso",
  "id_resposta": 10
}
```

#### Controller

O controller seria `RespostaController`, responsável por:

- receber os dados enviados pelo frontend;
- validar e encaminhar para o serviço;
- retornar o resultado adequado.

#### Fluxo completo

1. O usuário envia uma nova resposta;
2. O frontend envia a requisição para o backend;
3. O `RespostaController` recebe os dados;
4. O `RespostaService` valida e processa a operação;
5. O `RespostaRepository` grava no banco;
6. O controller devolve a resposta JSON.

## 4. Diagrama MVC proposto

Arquivo-fonte: `diagramamvc.mmd`  
Imagem: `diagramamvc.png`

O diagrama mostra a relação entre requisição HTTP, controller, model,
view JSON e resposta final ao cliente.

## 5. Benefícios da proposta

A proposta arquitetural apresenta diversas vantagens:

- Melhor separação de responsabilidades;
- Código mais legível e organizado;
- Facilidade para manutenção e testes;
- Redução do acoplamento entre interface, regra de negócio e dados;
- Maior facilidade para evoluir o sistema com novas funcionalidades.

Além disso, a aplicação combinada de camadas e MVC melhora a clareza da
estrutura do backend e facilita o trabalho em equipe.

## Conclusão

A reorganização do ESM Forum em camadas e com uso mais claro de MVC
tornaria o sistema mais robusto e mais alinhado com boas práticas de
engenharia de software.

Na proposta apresentada, a camada de apresentação concentra rotas e
controllers, a camada de negócio concentra serviços e regras, e a camada
de dados concentra repositórios e persistência.

A aplicação de MVC foi exemplificada nas funcionalidades de busca de
perguntas e cadastro de respostas, mostrando como Models, Views e
Controllers poderiam interagir de forma organizada e consistente.