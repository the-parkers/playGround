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
    connection: process.env.DATABASE_URL, 
     ssl: {rejectUnauthorized: false},
    // connection: {
    //   database: 'my_db',
    //   user:     'username',
    //   password: 'password'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }

};
