const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('operators').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('operators').insert([
        {username: 'John', password: bcrypt.hashSync('Doe123', 8)},
        {username: 'Jane', password: bcrypt.hashSync('Jane123', 8)},
        {username: 'Tom',  password: bcrypt.hashSync('Tom123', 8)},
        {username: 'Steve', password: bcrypt.hashSync('Steve123', 8) },
        {username: 'Doug',  password: bcrypt.hashSync('Doug123', 8)},
        {username: 'Maria', password: bcrypt.hashSync('Maria123', 8)}
      ]);
    });
};
