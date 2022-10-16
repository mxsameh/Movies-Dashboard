import { Pool } from "pg";
import dotenv from 'dotenv';

// env variables setup
dotenv.config()
const env = process.env;
const nodeEnv = process.env.NODE_ENV

let db : Pool;

if(nodeEnv == 'prod')
{
  db = new Pool(
    {
      host : env.PROD_DB_HOST,
      database : env.PROD_DB,
      user : env.PROD_DB_USER,
      password : env.PROD_DB_PASSWORD,
      ssl : {
        rejectUnauthorized : false
      }
    }
  )
}
else
{
  db = new Pool(
    {
      host : env.DEV_DB_HOST,
      database : env.DEV_DB,
      user : env.DEV_DB_USER,
      password : env.DEV_DB_PASSWORD,
    }
  )
}

export default db;