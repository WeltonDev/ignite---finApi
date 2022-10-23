const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(express.json());

// Middlewares

function verfiryExistCPF(req, res, next) {
  try {
    const { cpf } = req.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
      return res.status(400).json(`Customer not found!`);
    }

    req.customer = customer;

    return next();

  } catch (error) {
    constole.log(error);
  }
};

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

const customers = [];


// Rotas

app.post('/', (req, res) => {
  try {
    const { cpf, name } = req.headers;
    const id = uuidv4();

    const customerExists = customers.some((customer) => customer.cpf === cpf);

    if (customerExists) {
      return res.status(400).json(`Cliente não cadastrado!`);
    }

    customers.push({
      cpf, name, id, statement: []
    });

    return res.status(201).json(`Cliente cadastrado com sucesso!`);
  } catch (error) {
    console.log(error);
  }
});

app.get('/statement/', verfiryExistCPF, (req, res) => {
  try {

    const { customer } = req;

    return res.status(200).json(customer.statement);

  } catch (error) {
    console.log(error);
  }
});

app.post('/deposit', verfiryExistCPF, (req, res) => {
  try {
    const { description, amount } = req.body;

    const { customer } = req;

    const statementOperation = {
      description,
      amount,
      createdAt: new Date(),
      type: 'credit'
    }

    customer.statement.push(statementOperation);

    return res.status(201).json('Deposito realizado com sucesso!');
  } catch (error) {
    console.log(error);
  }
});

app.post('/withdraw', verfiryExistCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json(`Saldo insuficiente!`);
  }

  const statementOperation = {
    amount,
    createdAt: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);

  return res.status(201).json(`withdraw sucess!`);
});

app.get('/statement/date', verfiryExistCPF, (req, res) => {
  try {

    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => statement.createdAt.toDateString() === new Date(dateFormat).toDateString())

    return res.status(200).json(statement);

  } catch (error) {
    console.log(error);
  }
});

app.put('/account', verfiryExistCPF, (req, res) => {
  try {
    const { name } = req.body;
    const { customer } = req;

    customer.name = name;

    return res.status(201).json(`Cliente atualizado com sucesso!`);
  } catch (error) {
    console.log(error);
  }
});

app.get('/account', verfiryExistCPF, (req, res) => {
  try {
    const { customer } = req;

    return res.status(201).json(customer);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/account', verfiryExistCPF, (req, res) => {
  try {
    const { customer } = req;

    customers.splice(customer, 1);

    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
  }
});

app.get('/balance', verfiryExistCPF, (req, res) => {
  try {
    const { customer } = req;

    const balance = getBalance(customer.statement);

    return res.status(200).json(balance);
  } catch (error) {
    console.log(error);
  }
});


app.listen(3333, () => { console.log(`Servidor rodando em: http://localhost:3333`) });