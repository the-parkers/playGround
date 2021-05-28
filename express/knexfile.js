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
    connection: 'postgres://elaipsgbbnouhy:46b0e0a2ad4ad20727747d0eee88b6e3aaf1703efb70aeb5030c07cdf580ae06@ec2-3-234-85-177.compute-1.amazonaws.com:5432/df0ej4iqq9frsf&ssl=true',
    // connectionString: process.env.DATABASE_Url,
    // connection: {
    //   user: process.env.DB_USERNAME,
    //   database: process.env.DB_DATABASE,
    //   password: process.env.DB_PASSWORD,
    //   host: process.env.DB_HOSTNAME,
    //   port: 5432,
    //   ssl: { rejectUnauthorized: false }
    // },
  
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
