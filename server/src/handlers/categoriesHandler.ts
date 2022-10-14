import { Application, Request, Response } from "express";
import Categories from "../models/categoryModel";

const categoriesTable = new Categories()

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

const update = async ( req : Request, res : Response) =>
{
  const id = parseInt(req.params.id)
  const category = req.body.category
  try
  {
    const updatedCategory = await categoriesTable.update(id,category) 
    if(updatedCategory == category)
    {
      res.status(200).json({updated : true})
    }
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}

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

const categoriesRoutes = (app : Application) =>
{
  app.get('/categories',index)
  app.post('/categories',create)
  app.delete('/categories/:id',destroy)
  app.put('/categories/:id',update)
}

export default categoriesRoutes