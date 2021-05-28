const knex = require('knex')
const knexConfig = require('../knexfile')
const environment = process.env.DB_ENV || 'development';
const db = knex(knexConfig[environment]);
// const db = knex(knexFile.development)
module.exports = db