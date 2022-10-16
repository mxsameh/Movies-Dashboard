import { Application, Request, Response } from "express";
import authenticate from "../middlewares/authenticate";
import Movies from "../models/movieModel";

const moviesTable = new Movies()

const index = async (req : Request, res : Response) =>
{
  try
  {
    const movies = await moviesTable.index()
    res.status(200).json(movies)
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}

const create = async (req : Request, res : Response) =>
{
  const movie = req.body.movie
  try
  {
    const createdMovie = await moviesTable.create(movie)
    if(createdMovie.title == movie.title)
    {
      res.status(200).json({movieCreated : true})
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
  const movie = req.body.movie
  try
  {
    const updatedMovie = await moviesTable.update(id,movie)
    if(updatedMovie && updatedMovie.id == id)
    {
      res.status(200).json({updated : true})
    }
    else
    {
      res.status(404).json({updated : false, msg : `couldn't find movie`})
    }
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}

const destroy = async (req : Request, res : Response) =>
{
  const id = parseInt(req.params.id)
  try
  {
    const movie = await moviesTable.delete(id)
    if(movie.id == id)
    {
      res.status(200).json({movieDeleted : true})
    }
    else
    {
      res.status(400).json({movieDeleted : false, msg : `movie not found`})
    }
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}


const moviesRoutes = (app : Application) =>
{
  app.get('/movies',index)
  app.post('/movies', authenticate,create)
  app.delete('/movies/:id', authenticate ,destroy)
  app.put('/movies/:id', authenticate,update)
}

export default moviesRoutes