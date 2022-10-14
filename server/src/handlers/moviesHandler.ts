import { Application, Request, Response } from "express";
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
  console.log( movie );
  console.log( typeof(movie.rate) );
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

const destroy = async (req : Request, res : Response) =>
{
  const id = req.body.movie.id

  try
  {
    const movie = moviesTable.delete(id)
    res.status(200).json({movieDeleted : true})
  }
  catch(err)
  {
    res.status(500).json(`${err}`)
  }
}


const moviesRoutes = (app : Application) =>
{
  app.get('/movies',index)
  app.post('/movies',create)
  app.delete('/movies',destroy)
}

export default moviesRoutes