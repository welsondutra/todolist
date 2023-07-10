# Lista de Tarefas

Este é um projeto de lista de tarefas simples. Permite adicionar, atualizar e excluir tarefas, além de filtrar e pesquisar tarefas existentes.

## Funcionalidades

- Adicionar uma nova tarefa.
- Marcar uma tarefa como concluída.
- Editar o conteúdo de uma tarefa.
- Excluir uma tarefa.
- Filtrar tarefas por status (concluídas, pendentes) ou exibir todas.
- Pesquisar tarefas por texto.
- Exibir uma lista de todas as tarefas salvas no banco de dados.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- jQuery
- PHP
- MySQL

## Configuração

1. Clone o repositório em sua máquina local.
2. Certifique-se de ter um servidor PHP e um servidor MySQL configurados e em execução.
3. Importe o arquivo de banco de dados fornecido na raiz do projeto (ou execute os comandos SQL apropriados para criar o banco de dados e as tabelas necessárias).
4. Atualize as configurações de conexão ao banco de dados no arquivo `service.php` com as informações do seu servidor MySQL.
5. Inicie o servidor PHP e abra o projeto em um navegador da web.

## Estrutura do Projeto

- `index.html`: O arquivo HTML principal que contém a estrutura da página.
- `style.css`: O arquivo CSS que estiliza a página.
- `script.js`: O arquivo JavaScript que manipula as interações do usuário e faz as requisições AJAX.
- `service.php`: O arquivo PHP que contém a lógica do servidor para manipular as requisições e interagir com o banco de dados.
- `database.sql`: O arquivo SQL contendo o esquema do banco de dados e exemplos de dados iniciais.
