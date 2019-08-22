const { Pool }  = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'password',
  host: 'localhost',
  database: 'lightbnb',
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

module.exports = {
  query: (queryString, queryParams) => pool.query(queryString, queryParams)
};