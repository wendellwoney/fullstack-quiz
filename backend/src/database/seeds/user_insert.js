const crypto = require('crypto');
var dotenv = require('dotenv');
dotenv.config({path:'../../.env'});

exports.seed = function(knex) {

  const hash = crypto.pbkdf2Sync('123', process.env.SECRET,  
    1000, 64, `sha512`).toString(`hex`);

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Admin', phone : '(79)99120-7363', email: 'wendellwoneys@gmail.com', pass: hash}
      ]);
    });
};
