
exports.up = function(knex) {
  return knex('users').insert({first_name: 'zxcvbnm', last_name:'Jenkins', user_image:null, email:null, encrypted_password:null})
};

exports.down = function(knex) {
  return knex('users').where('first_name', 'zxcvbnm').del()
};
