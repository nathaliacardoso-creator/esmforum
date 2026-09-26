# Planejamento de Pair Programming

## Identificação

**Aluna:** Nathalia Cardoso
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Engenharia de Software 

## Introdução

Pair Programming, ou programação em par, é uma prática da metodologia
Extreme Programming na qual duas pessoas trabalham juntas na
implementação de uma mesma funcionalidade.

Durante a sessão, os participantes assumem os papéis de driver e
navigator. Mesmo que esta atividade esteja sendo desenvolvida
individualmente, este documento apresenta como a prática seria aplicada
caso houvesse um par disponível.

## Papéis

### Driver

O driver é responsável por controlar o teclado e escrever o código.

Suas principais responsabilidades seriam:

- Implementar o código discutido pela dupla;
- Executar os comandos necessários;
- Realizar alterações nos arquivos;
- Executar os testes;
- Explicar as decisões durante a implementação.

### Navigator

O navigator acompanha a implementação sem controlar diretamente o
teclado.

Suas principais responsabilidades seriam:

- Revisar o código em tempo real;
- Identificar possíveis erros;
- Sugerir melhorias;
- Consultar a documentação;
- Verificar se a implementação atende aos requisitos;
- Pensar nos próximos passos da solução.

## Estratégia de aplicação

A prática seria aplicada durante o desenvolvimento das funcionalidades
planejadas para o ESM Forum.

Antes de iniciar cada sessão, a dupla escolheria uma Issue no GitHub
Project e moveria o card da coluna `Pronto para fazer` para a coluna
`Em andamento`.

A sessão seguiria estas etapas:

1. Ler a Issue e confirmar o objetivo da funcionalidade;
2. Identificar os arquivos que precisarão ser alterados;
3. Definir quem começará como driver e navigator;
4. Implementar uma pequena parte da funcionalidade;
5. Executar e testar o código;
6. Trocar os papéis;
7. Revisar a implementação completa;
8. Registrar as alterações no Git;
9. Mover o card para `Em revisão/testes`.

## Ferramentas

As sessões poderiam utilizar as seguintes ferramentas:

### Visual Studio Code

Seria utilizado para editar os arquivos, executar o sistema e acessar o
terminal integrado.

### VS Code Live Share

Permitiria que os dois participantes acessassem a mesma sessão de
programação remotamente, acompanhassem as alterações e colaborassem no
mesmo código.

### Discord ou Google Meet

Seria utilizado para comunicação por voz e compartilhamento de tela
durante a sessão.

### Git e GitHub

Seriam utilizados para controle de versão, registro dos commits, criação
de Issues e acompanhamento das atividades no GitHub Project.

### GitHub Projects

Seria utilizado para escolher a funcionalidade da sessão e acompanhar
seu avanço entre as colunas do Kanban.

## Rotação dos papéis

Os papéis de driver e navigator seriam trocados a cada 25 minutos ou
após a conclusão de uma pequena etapa da funcionalidade.

Um exemplo de sessão seria:

| Período | Participante 1 | Participante 2 |
|---------|----------------|----------------|
| Primeiros 25 minutos | Driver | Navigator |
| Próximos 25 minutos | Navigator | Driver |
| Revisão final | Revisão conjunta | Revisão conjunta |

A rotação permite que os dois participantes contribuam com a
implementação e compreendam todas as alterações realizadas.

## Aplicação na busca por palavra-chave

Na implementação da busca de perguntas por palavra-chave, a divisão
inicial poderia ser:

- O driver criaria a rota de busca no backend;
- O navigator conferiria o uso correto dos parâmetros e da consulta;
- Depois da troca, o novo driver criaria o campo de pesquisa no
  frontend;
- O novo navigator verificaria a comunicação entre o frontend e a API;
- Ao final, os dois participantes executariam os testes da busca.

## Comunicação

Durante a sessão, as decisões seriam discutidas antes da alteração do
código. O driver explicaria o que está implementando e o navigator
apresentaria sugestões de forma objetiva.

Em caso de discordância, a dupla consultaria os requisitos, o código
existente e a documentação das tecnologias utilizadas antes de decidir.

## Boas práticas

Durante as sessões, seriam adotadas as seguintes práticas:

- Trabalhar em apenas uma funcionalidade por vez;
- Criar alterações pequenas;
- Executar testes frequentemente;
- Evitar que o navigator fique apenas observando;
- Trocar os papéis regularmente;
- Registrar commits claros;
- Revisar o código antes de finalizar a sessão;
- Atualizar o status do card no GitHub Project.

## Adaptação para trabalho individual

Como esta atividade está sendo realizada individualmente, não foi
possível aplicar uma sessão real de Pair Programming.

Nesse caso, a revisão normalmente realizada pelo navigator foi adaptada
por meio das seguintes ações:

- Leitura dos requisitos antes da implementação;
- Execução do sistema após cada alteração;
- Revisão manual do código;
- Utilização de testes automatizados;
- Consulta à documentação;
- Uso do Git para registrar pequenas etapas;
- Verificação das Issues e do GitHub Project.

Essa adaptação não substitui completamente a troca de conhecimentos
entre duas pessoas, mas ajuda a manter um processo organizado e reduzir
erros durante o desenvolvimento.

## Conclusão

O Pair Programming poderia contribuir para o ESM Forum por meio da
revisão contínua, do compartilhamento de conhecimento e da identificação
antecipada de erros.

A utilização de VS Code Live Share, Discord ou Google Meet permitiria
aplicar essa prática remotamente. A rotação entre driver e navigator
garantiria a participação ativa dos dois integrantes durante a
implementação das funcionalidades.