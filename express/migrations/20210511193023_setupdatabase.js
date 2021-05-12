
exports.up = function(knex) {
    let initQuery = `CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, user_image Text, email CHAR(50), encrypted_password CHAR(60));
    CREATE TABLE parks (id SERIAL PRIMARY KEY, park_name TEXT, park_location TEXT,park_latitude TEXT, park_longitude TEXT,type TEXT);
    CREATE TABLE basketball_courts (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT);
    CREATE TABLE handball_courts (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT, court_count TEXT);
    CREATE TABLE indoor_pool (id SERIAL PRIMARY KEY, name TEXT, location TEXT,latitude TEXT, longitude TEXT, pool_type TEXT, pool_size TEXT);
    CREATE TABLE outdoor_pool (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT, pool_type TEXT, pool_size TEXT);
    CREATE TABLE running_track (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT, size TEXT, track_type TEXT);
    CREATE TABLE bbqing_areas (id SERIAL PRIMARY KEY, Name TEXT, location TEXT);
    CREATE TABLE dog_areas (id SERIAL PRIMARY KEY, Name TEXT, Address TEXT, DogRuns_Type TEXT);
    CREATE TABLE park_events (id SERIAL PRIMARY KEY, title TEXT, description TEXT, parknames TEXT, startdate TEXT, enddate TEXT, starttime TEXT, endtime TEXT, location TEXT, coordinates TEXT, image TEXT);

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
    DROP TABLE users;
    DROP TABLE basketball_courts;
    DROP TABLE handball_courts;
    DROP TABLE indoor_pool;
    DROP TABLE outdoor_pool;
    DROP TABLE running_track;
    DROP TABLE bbqing_areas;
    DROP TABLE dog_areas;
    DROP TABLE park_events
    `
    return knex.raw(dropInitQuery)
};
