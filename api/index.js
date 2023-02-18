const jsonServer = require('json-server');
const server = jsonServer.create();
let router;
const middlewares = jsonServer.defaults();
server.use(middlewares);

server.use((req, res, next) => {
  const fs = require('fs');

  const jsonData = {
    persons: [
      {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1,
      },
      {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2,
      },
      {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3,
      },
      {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4,
      },
      {
        name: 'Amanda Winders',
        number: '04-253-5214',
        id: 5,
      },
    ],
  };

  fs.writeFile(
    '/tmp/db.json',
    JSON.stringify(jsonData),
    'utf8',
    function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
      router = jsonServer.router('/tmp/db.json');
      server.use('/api', router);
      next();
    }
  );
});

module.exports = server;
