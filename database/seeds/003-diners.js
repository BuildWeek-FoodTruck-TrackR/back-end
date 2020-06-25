const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('diners').del()
    .then(function () {
      // Inserts seed entries
      return knex('diners').insert([
        {username: 'Johnny', password: bcrypt.hashSync('test123',8), location: '5542 Foothill Blvd, Oakland, CA'},
        {username: 'Thomas', password: bcrypt.hashSync('man123',8), location: '1322 Campbell St, Oakland, CA'},
        {username: 'Jimmy',  password: bcrypt.hashSync('turn123',8), location: '7220 Krause Ave, Oakland, CA '},
        {username: 'Joe', password: bcrypt.hashSync('chiang', 8), location: '3268 San Pablo Ave, Oakland, CA'},
        {username: 'Rosa', password: bcrypt.hashSync('solorzano', 8), location: '3550 Fruitvale Ave, Oakland, CA 94602'},
        {username: 'Cindy', password: bcrypt.hashSync('pollard', 8), location: '2607 Myrtle St, Oakland, CA 94607'},
        {username: 'Matthew', password: bcrypt.hashSync('woods', 8), location: '3860 Martin Luther King Jr Way'},
        {username: 'Betty', password: bcrypt.hashSync('white', 8), location: '12250 Skyline Blvd, Oakland, CA'}
      ]);
    });
};
