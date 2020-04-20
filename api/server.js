const express = require('express');
const userRouter = require('../users/router');
const authRouter = require('../auth/router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({api: 'up'});
});

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;
