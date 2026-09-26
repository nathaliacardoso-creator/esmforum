# Instalação e execução do ESM Forum

## Identificação

**Aluna:** Nathalia Cardoso
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Engenharia de Software 

## Tecnologias utilizadas

O ESM Forum é composto por:

- Backend desenvolvido com Node.js e Express;
- Banco de dados SQLite;
- Frontend desenvolvido com React;
- Git e GitHub para controle de versão.

## Pré-requisitos

Para executar o projeto, é necessário instalar:

- Git;
- Node.js 22 LTS;
- npm;
- Visual Studio Code;
- Navegador de internet.

As versões podem ser verificadas pelos comandos:

```powershell
git --version
node --version
npm.cmd --version
```

## Clonagem dos repositórios

Primeiramente, foram criados forks dos repositórios do backend e do frontend na conta git.

Depois, os repositórios foram clonados com os comandos:

```powershell
git clone [https://github.com/nathaliacardoso-creator/esmforum](https://github.com/nathaliacardoso-creator/esmforum)
git clone [https://github.com/nathaliacardoso-creator/esmforum-react](https://github.com/nathaliacardoso-creator/esmforum-react)
```

Os projetos ficaram organizados desta forma:

```text
projeto-es1/
├── esmforum/
└── esmforum-react/
```

## Instalação do backend

No terminal do Visual Studio Code, foi acessada a pasta do backend:

```powershell
cd esmforum
```

Em seguida, as dependências foram instaladas:

```powershell
npm.cmd install
```

Durante a configuração no Windows, a dependência `sqlite3` apresentou incompatibilidade e tentou utilizar ferramentas de compilação do Visual Studio. Como o projeto utiliza `better-sqlite3` em `bd/bd_utils.js`, a dependência `sqlite3` não utilizada foi removida do `package.json`.

Depois da alteração, foram removidos os arquivos da instalação incompleta:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
```

As dependências foram instaladas novamente:

```powershell
npm.cmd install
```

A instalação foi concluída com sucesso e sem vulnerabilidades informadas pelo npm.

## Execução do backend

Para iniciar o backend, foi utilizado:

```powershell
node server.js
```

O terminal apresentou a mensagem:

```text
ESM Forum rodando em 5000
```

O funcionamento da API foi verificado pelo endereço:

```text
http://localhost:5000
```

O navegador exibiu as perguntas cadastradas no formato JSON.

## Instalação do frontend

Com o backend em execução, foi aberto um segundo terminal no Visual Studio Code.

A pasta do frontend foi acessada:

```powershell
cd esmforum-react
```

As dependências foram instaladas:

```powershell
npm.cmd install
```

## Execução do frontend

O frontend foi iniciado com:

```powershell
npm.cmd start
```

A aplicação foi aberta pelo navegador no endereço:

```text
http://localhost:3000
```

O backend deve permanecer em execução na porta 5000 para que o frontend consiga consultar e cadastrar perguntas e respostas.

## Organização dos terminais

Durante a execução, foram utilizados dois terminais:

- Terminal 1: backend executando na porta 5000;
- Terminal 2: frontend executando na porta 3000.

Para encerrar cada aplicação, utiliza-se o comando:

```text
Ctrl + C
```

## Verificação

Foram realizadas as seguintes verificações:

- Backend iniciado corretamente;
- API acessada pelo navegador;
- Banco de dados carregado;
- Perguntas exibidas em JSON;
- Frontend iniciado;
- Interface do ESM Forum acessada pelo navegador;
- Comunicação entre frontend e backend confirmada.

## Problemas encontrados

O PowerShell bloqueou inicialmente a execução do arquivo `npm.ps1`. Para evitar essa restrição, os comandos do npm foram executados utilizando `npm.cmd`.

Também ocorreu uma incompatibilidade da dependência `sqlite3` com o ambiente utilizado. Como o código do projeto utiliza `better-sqlite3`, a dependência não utilizada foi removida, permitindo concluir a instalação sem instalar ferramentas adicionais de compilação.