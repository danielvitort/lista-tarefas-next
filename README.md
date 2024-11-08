# Lista de Tarefas

Este projeto é uma aplicação de gerenciamento de tarefas com funcionalidades de criação, edição e exclusão de tarefas. A interface é simples e intuitiva, permitindo o acompanhamento de tarefas com prazos e custos. O projeto foi desenvolvido com Next.js e React, utilizando Axios para realizar requisições de API, Prisma e PostgreSQL para manipulação do banco de dados, e React Icons para os ícones de edição e exclusão.

## Funcionalidades
- **Adicionar Tarefas**: Crie uma nova tarefa informando o nome, custo e data limite.
- **Editar Tarefas**: Atualize os dados de uma tarefa existente.
- **Excluir Tarefas**: Remova uma tarefa da lista.
- **Visualização de Tarefas**: As tarefas são exibidas em uma tabela com coloração diferenciada para custos altos.

## Link Projeto 
https://lista-tarefas-next.vercel.app/

## Tecnologias utilizadas
- **Next.js** - Framework para renderização no lado do servidor e otimização de performance.
- **React** - Biblioteca para criação de interfaces dinâmicas.
- **Prisma** - ORM para interagir com o banco de dados de forma intuitiva e segura.
- **PostgreSQL** - Banco de dados relacional utilizado para armazenar as informações das tarefas na plataforma em nuvem **Neon**.
- **Axios** - Cliente HTTP para fazer requisições à API.
- **React Icons** - Biblioteca de ícones para os botões de ação.
- **TypeScript** - Utilizado para tipagem estática e segurança no código.

## Instalação
### Pré-requisitos
- Node.js instalado (versão 12 ou superior).
- Gerenciador de pacotes npm ou yarn.
- Banco de dados PostgreSQL configurado no Neon ou localmente.
### Passos para a instalação
1. `git clone https://github.com/danielvitort/lista-tarefas-next`
2. `npm install`
3. Renomeie o arquivo .env.example para .env e preencha as informações de conexão com o banco de dados PostgreSQL.
4.`npx prisma migrate dev --name init`
  
## Para rodar
- `npm run dev`
