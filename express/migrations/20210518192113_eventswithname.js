
exports.up = function(knex) {
    let initQuery = `
    CREATE TABLE basketball_courts_name (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT, park_name TEXT);
    CREATE TABLE handball_courts_name (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT, court_count TEXT, park_name TEXT);
    CREATE TABLE indoor_pool_name (id SERIAL PRIMARY KEY, name TEXT, location TEXT,latitude TEXT, longitude TEXT, pool_type TEXT, pool_size TEXT, park_name TEXT);
    CREATE TABLE outdoor_pool_name (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT, pool_type TEXT, pool_size TEXT, park_name TEXT);
    CREATE TABLE running_track_name (id SERIAL PRIMARY KEY, name TEXT, location TEXT, latitude TEXT, longitude TEXT, size TEXT, track_type TEXT, park_name TEXT);
    CREATE TABLE bbqing_areas_name (id SERIAL PRIMARY KEY, Name TEXT, location TEXT, park_name TEXT);
    CREATE TABLE dog_areas_name (id SERIAL PRIMARY KEY, Name TEXT, Address TEXT, DogRuns_Type TEXT, park_name TEXT);
    `
    return knex.raw(initQuery)
};

exports.down = function(knex) {
    let dropInitQuery = `
    DROP TABLE basketball_courts_name;
    DROP TABLE handball_courts_name;
    DROP TABLE indoor_pool_name;
    DROP TABLE outdoor_pool_name;
    DROP TABLE running_track_name;
    DROP TABLE bbqing_areas_name;
    DROP TABLE dog_areas_name;
    `
    return knex.raw(dropInitQuery)
};

/**
  fetch('https://www.nycgovparks.org/bigapps/DPR_Basketball_001.json')
        .then(response => response.json())
        .then(json
 */