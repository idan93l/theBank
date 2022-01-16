const fs = require("fs");

const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("./db/users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const loadSingleUser = (body) => {
  // console.log(body);
  const users = loadUsers();
  const singleUser = users.find((user) => user.id === body.id);
  if (!singleUser) throw Error(`No user with id: ${body.id} exists!`);
  return stringToJson("Searched user", singleUser);
};

const addUser = (body) => {
  // console.log(body);
  const users = loadUsers();
  users.find((user) => {
    if (user.id === body.id) {
      throw Error("This user already exists");
    }
  });
  //! tests to all key and properteis
  //! tests to all key and properteis
  //! tests to all key and properteis
  //! tests to all key and properteis
  //* All good
  //   const newUser = { id: body.ID };
  users.push(body);
  saveUsers(users);
  return stringToJson("New-client", body);
};

const addCash = (body) => {
  const { id, cash } = body;
  const users = loadUsers();
  const singleUser = users.find((user) => user.id === id);
  if (!singleUser) throw Error(`No user with id: ${body.id} exists!`);
  const updatedCash = +singleUser.cash + cash;
  singleUser.cash = updatedCash;
  saveUsers(users);
  return stringToJson(`${cash} cash was added to user ${id}`, singleUser);
};
const addCredit = (body) => {
  const { id, credit } = body;
  const users = loadUsers();
  const singleUser = users.find((user) => user.id === id);
  if (!singleUser) throw Error(`No user with id: ${body.id} exists!`);
  const updatedcredit = +singleUser.credit + credit;
  singleUser.credit = updatedcredit;
  saveUsers(users);
  return stringToJson(`${credit} credit was added to user ${id}`, singleUser);
};

const withdraw = (body) => {
  const { id, cash } = body;
  const users = loadUsers();
  const singleUser = users.find((user) => user.id === id);
  if (!singleUser) throw Error(`No user with id: ${body.id} exists!`);
  if (
    +singleUser.cash === 0 &&
    (+singleUser.credit === 0 || +singleUser.credit < cash)
  )
    throw Error(`Can't withdraw money from user ${id}`);
  if (+singleUser.cash < cash) {
    const updatedCredit = +singleUser.credit - (cash - +singleUser.cash);
    singleUser.credit = updatedCredit;
    singleUser.cash = 0;
  } else {
    const updatedCash = +singleUser.cash - cash;
    singleUser.cash = updatedCash;
  }
  saveUsers(users);
  return stringToJson(`${cash} withdrawed from user ${id}`, singleUser);
};

const transfer = (body) => {
  const { id, to, credit } = body;
  const users = loadUsers();
  const singleUser = users.find((user) => user.id === id);
  if (!singleUser) throw Error(`No user with id: ${body.id} exists!`);
  const toUser = users.find((user) => user.id === to);
  if (!toUser) throw Error(`No user with id: ${body.to} exists!`);
  if (+singleUser.credit === 0 || +singleUser.credit < credit)
    throw Error(`User ${id} does not have enough money to transfer`);
  const updatedCredit = +singleUser.credit - credit;
  singleUser.credit = updatedCredit;
  const toCredit = +toUser.credit + credit;
  toUser.credit = toCredit
  saveUsers(users);
  return stringToJson(`${credit} withdrawed from user ${id}`, singleUser, `To user ${to}`, toUser);
};

const stringToJson = (message, string, message2, string2) => {
  return JSON.stringify({ [message]: string, [message2]: string2 });
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("./db/users.json", dataJSON);
};

module.exports = {
  loadUsers,
  loadSingleUser,
  addUser,
  addCash,
  addCredit,
  withdraw,
  transfer,
};
