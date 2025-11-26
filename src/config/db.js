import mysql from "mysql2";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

// Mysql Connection
const mysql_config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MySQL_USER,
  password: process.env.MySQL_PWD,
  database: process.env.MySQL_DB_NAME,
};

const pool = mysql.createPool(mysql_config);

pool.query = promisify(pool.query);

/**
 * Execute query SQL.
 * @param {string} sql - SQL query.
 * @param {Array} values - Array of values ​​for the query (if any).
 * @returns {Promise<any>} - Query results.
 */
export const executeMysqlQuery = async (sql, values) => {
  try {
    return pool.query(sql, values);
  } catch (error) {
    console.error("db.js:", error);
    throw error;
  }
};
