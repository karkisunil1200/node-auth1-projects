const express = require('express');
const session = require('express-session');
const userRouter = require('../users/router');
const authRouter = require('../auth/router');
const authenticator = require('../auth/authenticator');

const server = express();

const sessionConfig = {
  name: 'cookie',
  secret: process.env.SESSION_SECRET || 'It is a secret for a reason',
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true
  }
};

server.use(express.json());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
  res.json({api: 'up'});
});

server.use('/api/users', authenticator, userRouter);
server.use('/api/auth', authRouter);

module.exports = server;
