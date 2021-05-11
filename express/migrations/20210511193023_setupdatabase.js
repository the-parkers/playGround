
exports.up = function(knex) {
    let initQuery = `CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, user_image Text, email CHAR(50), encrypted_password CHAR(60));
    CREATE TABLE parks (id SERIAL PRIMARY KEY, park_name TEXT, park_location TEXT,park_latitude TEXT, park_longitude TEXT);
    CREATE TABLE favorites (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), park_id INT REFERENCES parks(id));
    CREATE TABLE ratings (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), park_id INT REFERENCES parks(id), cleanliness_rating INT, amenities_rating INT, location_rating INT);
    CREATE TABLE events (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), park_id INT REFERENCES parks(id), event_time TIME, event_date DATE);
    `
    return knex.raw(initQuery)
};

exports.down = function(knex) {
    let dropInitQuery = `
    DROP TABLE favorites;
    DROP TABLE ratings;
    DROP TABLE events;
    DROP TABLE parks;
    DROP TABLE users;`
    return knex.raw(dropInitQuery)
};
