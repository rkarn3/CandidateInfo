const { Pool } = require('pg');

const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString,
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.message);
  });


module.exports = pool;
