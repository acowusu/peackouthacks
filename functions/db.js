if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}
const pg = require("pg");
pg.types.setTypeParser(20, "text", parseInt);
pg.types.setTypeParser(1700, "text", parseFloat);

const { Pool } = pg;

const config = {
  user: process.env.db_username,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_database,
  port: +process.env.db_port,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = class db {
  /**
   * Represents a book.
   * @constructor
   */
  constructor() {
    this.pool = new Pool(config);
  }
  /**
   * execute a string query (unsafe)
   * @param {string} query - The query to be executed
   * @return {Object}  - The query to be executed

   */
  execute(query, params = []) {
    console.log("Executing");
    return this.pool.connect().then((client) => {
      console.log("connection established");
      return client
        .query(query, params)
        .then((res) => {
          console.log("result");
          client.release();
          return res;
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  }
  /**
   * execute a string query (unsafe)
   * @param {string} query - The query to be executed
   * @param {string} params - parameters to be input
   * @return {Array}  - Array of results

   */
  getRows(query, params = []) {
    console.log("getting row");
    return this.pool.connect().then((client) => {
      console.log("connection established");
      return client
        .query(query, params)
        .then((res) => {
          console.log("result");
          client.release();
          return res.rows;
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  }
  getRow(query, params = []) {
    console.log("getting row");
    return this.pool.connect().then((client) => {
      console.log("connection established");
      return client
        .query(query, params)
        .then((res) => {
          console.log("result");
          client.release();
          return res.rows[0];
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    });
  }
};
