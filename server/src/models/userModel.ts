import db from '../database'

// User Type
export type User = {
  id? : number,
  name : string,
  email : string,
  password : string
}

// User Class
export default class Users {

  // Get all users from the database
  async index () : Promise <User[]> {
    try
    {
      const con = await db.connect();
      const sql = 'SELECT * FROM users';
      const result = await con.query(sql);

      con.release();
      return result.rows
    }
    catch(err)
    {
      throw new Error(`couldn't view all users\n${err}`)
    }
  }

  // Create new user
  async create(user : User) : Promise<User>{
    try
    {
      const con = await db.connect();
      const sql = 'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *';
      const result = await con.query(sql, [user.name, user.email, user.password]);

      con.release()
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't create new user\n${err}`)
    }
  }

  // Get user by email
  async show (email : string) : Promise<User> {
    try{
      const con = await db.connect();
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await con.query(sql, [email]);

      con.release()
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't view user (${email})\n${err}`)
    }
  }

}