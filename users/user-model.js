const db = require('../data/dbConfig');

module.exports = {
  getUsers,
  addUsers,
  findBy
};

function getUsers() {
  return db.select('*').from('users');
}

function addUsers(user) {
  return db
    .select('*')
    .from('users')
    .insert(user, 'id');
}

function findBy(filter) {
  return db
    .select('*')
    .from('users')
    .where(filter);
}
