const config = require("../config/config");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: 5432,
    database: config.db.database
});

module.exports = pool;