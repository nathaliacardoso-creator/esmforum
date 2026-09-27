# Proposta de Aplicação de Padrões de Projeto no ESM Forum

## Introdução

Este documento apresenta propostas de aplicação de padrões de projeto no
sistema ESM Forum, com foco em melhorias que podem ser incorporadas às
funcionalidades existentes e futuras.

Foram escolhidos três padrões que se mostram úteis para a evolução do
projeto: Factory, Observer e Facade.

Cada padrão foi analisado quanto ao contexto de uso, problema resolvido,
estrutura proposta e exemplo de implementação.

## 1. Padrão Factory

### Justificativa e contexto

O padrão Factory pode ser aplicado à funcionalidade de notificações de
novas respostas às perguntas do usuário.

Atualmente, caso o sistema passe a oferecer diferentes meios de
notificação, como e-mail, aviso interno no sistema e notificação push, o
código pode acabar criando diretamente cada tipo de objeto em vários
pontos do sistema.

Isso aumenta o acoplamento e dificulta a manutenção.

O padrão Factory é adequado porque centraliza a criação dos objetos de
notificação e permite escolher o tipo mais apropriado de forma
padronizada.

### Proposta de solução

A solução seria criar uma classe `NotificacaoFactory`, responsável por
receber o tipo de notificação desejado e retornar o objeto
correspondente.

Também seria criada uma abstração `Notificacao`, implementada por
classes como:

- `NotificacaoEmail`
- `NotificacaoSistema`
- `NotificacaoPush`

Assim, os serviços do sistema não precisariam conhecer diretamente as
classes concretas.

### Diagrama proposto

Arquivo-fonte: `diagramafactory.mmd`  
Imagem: `diagramafactory.png`

### Exemplo de pseudo-código

```javascript
class NotificacaoFactory {
  static criar(tipo) {
    if (tipo === 'email') return new NotificacaoEmail();
    if (tipo === 'sistema') return new NotificacaoSistema();
    if (tipo === 'push') return new NotificacaoPush();
    throw new Error('Tipo de notificação inválido');
  }
}

class NotificacaoEmail {
  enviar(usuario, mensagem) {
    console.log('Enviando e-mail para', usuario.email);
  }
}
```

### Benefícios esperados

- Centralização da criação de objetos;
- Menor acoplamento entre serviços e implementações concretas;
- Facilidade para adicionar novos tipos de notificação.

## 2. Padrão Observer

### Justificativa e contexto

O padrão Observer pode ser aplicado à funcionalidade de notificação de
novas respostas em perguntas já cadastradas no sistema.

Sempre que uma nova resposta for adicionada a uma pergunta, o sistema
poderia avisar automaticamente os usuários interessados, como o autor da
pergunta ou seguidores da discussão.

Sem esse padrão, a lógica de notificação pode ficar espalhada dentro da
rotina de cadastro de respostas.

O Observer é adequado porque permite modelar uma relação em que uma
pergunta notifica automaticamente seus observadores sempre que houver um
evento relevante.

### Proposta de solução

A classe `Pergunta` passaria a manter uma lista de observadores.

Seria criada uma interface `ObservadorPergunta` com o método
`atualizar(pergunta, resposta)`.

Classes concretas, como `UsuarioObservador`, implementariam esse
contrato.

Quando uma nova resposta fosse cadastrada, o sistema chamaria o método
de notificação da pergunta, que por sua vez atualizaria todos os
observadores registrados.

### Diagrama proposto

Arquivo-fonte: `diagramaobserver.mmd`  
Imagem: `diagramaobserver.png`

### Exemplo de pseudo-código

```javascript
class Pergunta {
  constructor() {
    this.observadores = [];
  }

  adicionarObservador(obs) {
    this.observadores.push(obs);
  }

  notificarObservadores(resposta) {
    this.observadores.forEach(obs =>
      obs.atualizar(this, resposta)
    );
  }
}

class UsuarioObservador {
  atualizar(pergunta, resposta) {
    console.log('Nova resposta recebida na pergunta', pergunta.id);
  }
}
```

### Benefícios esperados

- Automatização do processo de notificação;
- Menor acoplamento entre perguntas e canais de aviso;
- Facilidade para incluir novos observadores no futuro.

## 3. Padrão Facade

### Justificativa e contexto

O padrão Facade pode ser aplicado para simplificar o acesso às
funcionalidades principais do backend, especialmente quando várias
classes participam do mesmo fluxo.

Por exemplo, uma operação como adicionar uma resposta pode envolver
validação, gravação em banco e disparo de notificações. Já uma busca
pode envolver controller, service, estratégia e repositório.

Sem uma fachada, clientes internos do sistema podem precisar conhecer
muitos módulos ao mesmo tempo.

O padrão Facade é adequado porque oferece uma interface mais simples e
centralizada para orquestrar esses subsistemas.

### Proposta de solução

A solução seria criar uma classe `ForumFacade`, responsável por expor
operações de alto nível, como:

- `buscarPerguntas(termo)`
- `adicionarResposta(dados)`

Internamente, essa classe acionaria os serviços necessários, como
`BuscaService`, `RespostaService` e `NotificacaoService`.

Isso simplificaria o uso dos subsistemas e concentraria o fluxo de
orquestração em um ponto único.

### Diagrama proposto

Arquivo-fonte: `diagramafacade.mmd`  
Imagem: `diagramafacade.png`

### Exemplo de pseudo-código

```javascript
class ForumFacade {
  constructor(buscaService, respostaService, notificacaoService) {
    this.buscaService = buscaService;
    this.respostaService = respostaService;
    this.notificacaoService = notificacaoService;
  }

  buscarPerguntas(termo) {
    return this.buscaService.buscar(termo);
  }

  adicionarResposta(dados) {
    const resposta = this.respostaService.adicionarResposta(dados);
    this.notificacaoService.notificarUsuarios(
      dados.pergunta,
      resposta
    );
    return resposta;
  }
}
```

### Benefícios esperados

- Redução da complexidade de uso dos subsistemas;
- Organização da comunicação entre serviços;
- Facilidade de manutenção e evolução do backend.

## Conclusão

Os padrões Factory, Observer e Facade são adequados para a evolução do
ESM Forum porque atacam problemas reais do sistema: criação de objetos,
disparo de eventos e simplificação do fluxo entre módulos.

A aplicação desses padrões tornaria o backend mais modular, extensível e
coerente com boas práticas de engenharia de software.

Além disso, os três padrões são viáveis dentro do contexto do projeto,
mesmo que inicialmente sejam aplicados apenas em funcionalidades
específicas.