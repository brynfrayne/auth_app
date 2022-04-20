require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: process.env.db_user,
      password: process.env.db_password,
      database: 'auth_app',
      charset: 'utf8',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.clearDB_host,
      user: process.env.clearDB_user,
      password: process.env.clearDB_password,
      database: process.env.clearDB_database
    }
  }
};