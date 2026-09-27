# Processo ágil do ESM Forum

## Processo escolhido

Para o planejamento do projeto ESM Forum, foi escolhido o processo
Kanban.

O Kanban é um método ágil que representa o fluxo de trabalho por meio
de um quadro visual. As atividades são apresentadas em cards e
movimentadas entre colunas de acordo com seu estado atual.

## Justificativa

O Kanban foi escolhido porque o ESM Forum é um projeto pequeno e possui
cinco funcionalidades inicialmente conhecidas. O quadro permite
visualizar facilmente o que ainda precisa ser desenvolvido, o que está
em andamento e o que já foi concluído.

Esse processo também é adequado para o desenvolvimento individual,
pois não exige a criação de sprints com duração fixa. As funcionalidades
podem ser desenvolvidas de maneira contínua, respeitando a ordem de
prioridade.

## Estrutura do quadro

O GitHub Project foi organizado com as seguintes colunas:

### Backlog

Contém funcionalidades que ainda serão analisadas e desenvolvidas.

### Pronto para fazer

Contém funcionalidades detalhadas e preparadas para o início do
desenvolvimento.

### Em andamento

Contém a funcionalidade que está sendo implementada no momento.

### Em revisão/testes

Contém funcionalidades implementadas que ainda precisam ser revisadas
ou testadas.

### Concluído

Contém funcionalidades finalizadas, testadas e documentadas.

## Funcionalidades planejadas

Foram cadastradas as cinco funcionalidades solicitadas pelo cliente:

1. Implementar busca de perguntas por palavra-chave;
2. Adicionar categorização de perguntas por tags;
3. Implementar votação em perguntas;
4. Criar perfil de usuário com histórico;
5. Notificar usuário sobre novas respostas.

## Priorização

As funcionalidades foram organizadas da seguinte forma:

| Ordem | Funcionalidade | Prioridade |
|------:|----------------|------------|
| 1 | Busca de perguntas por palavra-chave | Alta |
| 2 | Categorização de perguntas por tags | Alta |
| 3 | Votação em perguntas | Média |
| 4 | Perfil de usuário com histórico | Média |
| 5 | Notificação de novas respostas | Baixa |

## Justificativa da priorização

A busca por palavra-chave recebeu prioridade alta porque permite que os
usuários encontrem rapidamente perguntas já cadastradas.

A categorização também recebeu prioridade alta porque melhora a
organização das perguntas e complementa a funcionalidade de busca.

A votação recebeu prioridade média porque ajuda a destacar perguntas
relevantes, mas exige o controle de votos por usuário.

O perfil recebeu prioridade média porque depende de uma estrutura mais
completa de usuários e do histórico de participação.

As notificações receberam prioridade baixa porque dependem do cadastro
de usuários e do funcionamento das perguntas e respostas.

## Controle do trabalho

Inicialmente, todos os cards foram adicionados ao Backlog. Durante o
desenvolvimento, cada card deverá avançar pelas colunas do quadro até
chegar à coluna Concluído.

Para evitar várias tarefas incompletas ao mesmo tempo, será mantida
somente uma funcionalidade na coluna Em andamento.

## Link do GitHub Project

https://github.com/users/nathaliacardoso-creator/projects/2