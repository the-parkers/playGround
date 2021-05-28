// Update with your config settings.
module.exports = {

  development: {
    client: 'postgresql',
    // connection: process.env.DATABASE_URL,
    connection: {
      database: 'playGround',
      user:     'postgres',
      password: 'Incredible1'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    // connection: process.env.DATABASE_URL,
    connectionString: process.env.DATABASE_Url,
    connection: process.env.DATABASE_URL, 
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
