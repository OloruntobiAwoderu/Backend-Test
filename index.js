/* eslint-disable no-undef */
const server = require('./api/routes/index');

const db = require('./config/db');

const Port = process.env.PORT || 4000;

db()
  .then(() => {
    console.log('database is connected');
  })
  .catch(err => {
    console.log(err);
  });

server.listen(Port, () => console.log(`Server running on port ${Port}`));
