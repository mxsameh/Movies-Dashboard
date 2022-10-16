import { Pool } from "pg";
import dotenv from 'dotenv';

// env variables setup
dotenv.config()
const env = process.env;

// Database setup
const db = new Pool(
  {
    host : env.DB_HOST,
    database : env.DB,
    user : env.DB_USER,
    password : env.DB_PASSWORD,
    ssl : {
      rejectUnauthorized : false
    }
  }
)

export default db;