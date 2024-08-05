import pg from "pg";

import { config } from "./config.js";

let db;

if (!db) {
  const { Pool } = pg;

  db = new Pool({
    host: config.POSTGRES_HOST,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DATABASE,
    max: 10,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 2000,
  });
}

export { db };
