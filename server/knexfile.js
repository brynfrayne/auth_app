require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'rootroot',
      database: 'auth_app',
      charset: 'utf8',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-east-05.cleardb.net',
      user: 'be12b40c26e091',
      password: '11ce8dd3',
      database: 'heroku_8851603c56e840a'
    }
  }
};