const Pool = require('pg').Pool;

const pool = new Pool({
  user: "rondunphy",
  password: "serone",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;

