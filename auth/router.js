const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

const router = express.Router();

router.post('/register', (req, res) => {
  const user = req.body;

  console.log('user: ', user);

  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.addUsers(user)

    .then(user => {
      res.status(201).json({data: user});
    })
    .catch(err => {
      res.status(500).json({message: 'Sever error on registering', error: err.message});
    });
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        res.status(200).json({welcome: `${user.username}`});
      } else {
        res.status(401).json({message: 'Invalid username or password'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not login, server error', error: err.message});
    });
});

module.exports = router;
