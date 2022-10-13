import db from '../database'

export type Movie = {
  id? : number,
  title : string,
  description: string,
  rate : number,
  image : string,
  category : string
}

export default class Movies {

  // View all movies of all categories
  async index () : Promise <Movie[]> {
    try
    {
      const con = await db.connect();
      const sql = 'SELECT * FROM movies';
      const result = await con.query(sql);

      con.release()
      return result.rows
    }
    catch(err)
    {
      throw new Error(`couldn't view all movies\n${err}`)
    }
  }

  // Create new movie
  async create(movie : Movie) : Promise <Movie> {
    try
    {
      const con = await db.connect()
      const sql = 'INSERT INTO movies (title,description,rate,image,category) VALUES ($1,$2,$3,$4,$5) RETURNING *'
      const result = await db.query(sql, [movie.title, movie.description, movie.rate, movie.image, movie.category])

      con.release()
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't create new movie\n${err}`)
    }
  }

  // Update movie
  async update (movie : Movie) : Promise <Movie> {
    try
    {
      const con = await db.connect()
      const sql = 'UPDATE movies SET title=$1, description=$2, rate=$3, image=$4, category=$5 WHERE id=$6 RETURNING *' 
      const result = await con.query(sql, [movie.title, movie.description, movie.rate, movie.image, movie.category, movie.id])

      con.release() 
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't update movie (${movie.title})\n${err}`)
    }
  }

  // Delete movie
  async delete (id : number) : Promise <Movie> {
    try{
      const con = await db.connect()
      const sql = 'DELETE FROM movies WHERE id = $1 RETURNING *'
      const result = await con.query(sql)

      con.release()
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't delete movie (id : ${id})\n${err}`)
    }
  }


}