const express = require('express');
const Users = require('./user-model');

const router = express.Router();

router.get('/', (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json({data: users});
    })
    .catch(err => {
      res.status(500).json({message: err.message});
    });
});

// router.post('/', (req, res) => {
//   const post = req.body;
//   console.log(post);

//   Users.addUsers(post)
//     .then(user => {
//       res.status(201).json({data: user});
//     })
//     .catch(err => {
//       res.status(500).json({message: err.message});
//     });
// });

module.exports = router;
