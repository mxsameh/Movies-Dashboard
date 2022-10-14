import db from '../database'

export type Category = {
  id? : number,
  title : string
} 

export default class Categories{

  // View all categories
  async index() : Promise <Category[]> {
    try
    {
      const con = await db.connect()
      const sql = 'SELECT * FROM categories'
      const result = await db.query(sql)

      con.release()
      return result.rows
    }
    catch(err)
    {
      throw new Error(`couldn't view all categories\n${err}`)
    }
  }

  // create a new category
  async create(category : Category)  : Promise <Category>{
    try
    {
      const con = await db.connect()
      const sql = 'INSERT INTO categories (title) VALUES ($1) RETURNING *'
      const result = await con.query(sql, [category.title])

      con.release()
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't create new category\n${err}`)
    }
  }

  // Update category
  async update(id : number,category : Category) : Promise <Category> {
    try
    {
      const con = await db.connect()
      const sql = 'UPDATE categories SET title = $1 where id = $2 RETURNING *'
      const result = await con.query(sql, [category.title, id]) 

      con.release()
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't update category (id : ${id})\n${err}`)
    }
  }

  // Delete a category
  async delete(id : number)  : Promise <Category>{
    try
    {
      const con = await db.connect()
      const sql = 'DELETE FROM categories WHERE id = $1 RETURNING *'
      const result = await con.query(sql, [id])

      con.release()
      return result.rows[0]
    }
    catch(err)
    {
      throw new Error(`couldn't delete category (id : ${id})\n${err}`)
    }
  }

}