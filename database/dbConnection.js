const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'fake_detection',
    password: 'XZ924POyZX',
    port: '5432',
});

module.exports = {
    pool,
    define: (modelName, attributes) => pool.define(modelName, attributes),
    query: (text, params) => pool.query(text, params),
};