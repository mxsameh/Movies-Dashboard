import { Application, Request, Response } from "express";
import authenticate from "../middlewares/authenticate";
import Categories from "../models/categoryModel";

// Create a categories table
const categoriesTable = new Categories()

/**
 * 
 * Categories Api Functions
 * 
 */

// Get all categories
const index = async (req : Request, res : Response) =>
{
  try
  {
    const categories = await categoriesTable.index()
    res.status(200).json(categories)
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}

// Create a new category
const create = async (req : Request, res : Response) =>
{
  const category = req.body.category
  try
  {
    const createdCategory = await categoriesTable.create(category)
    if(createdCategory.title == category.title)
    {
      res.status(200).json({created : true})
    }
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }

}

// Updata an existing category
const update = async ( req : Request, res : Response) =>
{
  const id = parseInt(req.params.id)
  const category = req.body.category
  try
  {
    const updatedCategory = await categoriesTable.update(id,category) 
    if(updatedCategory.id != category.id)
    {
      res.status(404).json({updated : false})
    }
    else{
      res.status(200).json({updated: true})
    }
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}

// Delete an existing category
const destroy = async ( req : Request, res : Response) =>
{
  const id = parseInt(req.params.id)
  try
  {
    const category = await categoriesTable.delete(id);
    if(category && id == category.id)
    {
      res.status(200).json({deleted : true})
    }
    else{
      res.status(404).json(`id not found`)
    }
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}


/**
 * Categories Routes
 */
const categoriesRoutes = (app : Application) =>
{
  app.get('/categories',index)
  app.post('/categories', authenticate,create)
  app.delete('/categories/:id', authenticate,destroy)
  app.put('/categories/:id', authenticate,update)
}

export default categoriesRoutes