# FinApi - Financeira 💰

### API Financeira que simula transações de contas bancárias. Este é o primeiro projeto realizado na trilha de NodeJs do Curso Ignite da Rocketseat.

## Tecnologias
- Nodejs
- Express
- UUID

## Como rodar o projeto 🚀

    # Clonar o repositório
    $ git clone https://github.com/WeltonDev/ignite---finApi

    # Entrar no diretório
    $ cd ignite---finApi

    # Instalar as dependências
    $ npm install

    # Iniciar o projeto
    $ npm run dev


## Requisitos
- [x] Deve ser possível criar umma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
## Regras de negócio
- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Deve ser possível retornar o balance
