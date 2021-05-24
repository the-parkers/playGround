
exports.up = function(knex) {
    return knex('ratings').insert({user_id: 1, park_id: 1660, cleanliness_rating: 0, amenities_rating: 0, location_rating: 0})
  
};

exports.down = function(knex) {
  return knex('ratings').where('user_id', 1).del()
};
