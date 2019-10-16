const knex = require('knex');

const connectionConfig = {
    client: 'mysql',
    connection: {
        host: 'remotemysql.com',
        user: '6gGmOx0ZoP',
        password: 'aLHFl9gKdj',
        database: '6gGmOx0ZoP'
    }
}

const conn = knex(connectionConfig);

module.exports = conn;