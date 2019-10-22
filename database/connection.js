const { DATABASE } = require('../config');
const knex = require('knex');

const connectionConfig = {
    client: DATABASE.CLIENT,
    connection: {
        host: DATABASE.HOST,
        user: DATABASE.USER,
        password: DATABASE.PASS,
        database: DATABASE.DATABASE_NAME
    }
}

const conn = knex(connectionConfig);

module.exports = conn;