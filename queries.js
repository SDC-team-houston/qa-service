const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
const pool = new Pool();

// callback style
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

// async/await style
const res = await pool.query('SELECT NOW()');
await pool.end();

// clients will also use environment variables
// for connection information
const client = new Client();
await client.connect();

const res = await client.query('SELECT NOW()');
await client.end