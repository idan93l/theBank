const express = require('express');
const app = express();
const { loadUsers, addUser, loadSingleUser, addCash, addCredit, withdraw, transfer } = require('./utils');
app.use(express.json());

app.get('/users', (req, res) => {
  try {
    res.status(200).send(loadUsers());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get('/user', (req, res) => {
  try {
    res.status(200).send(loadSingleUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message })};
})

app.post('/users', (req, res) => {
  try {
    res.status(201).send(addUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put('/deposit', (req, res) => {
  try {
    res.status(200).send(addCash(req.body))
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
})

app.put('/credit', (req, res) => {
  try {
    res.status(200).send(addCredit(req.body))
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
})

app.put('/withdrawal', (req, res) => {
  try {
    res.status(200).send(withdraw(req.body))
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
})

app.put('/transition', (req, res) => {
  try {
    res.status(200).send(transfer(req.body))
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
