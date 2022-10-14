import express, { Request, Response, Express } from 'express'
import categoriesRoutes from './handlers/categoriesHandler'
import moviesRoutes from './handlers/moviesHandler'
import usersRoutes from './handlers/usersHandler'

const app : Express = express()

// MIDDLEWARES
app.use(express.json())

// APIS
usersRoutes(app)
moviesRoutes(app)
categoriesRoutes(app)

// SERVER
app.get('/',(req : Request,res : Response) =>
{
  res.send('Wellcome!')
})

const port = 3000
app.listen(port, () =>
{
  console.log( `Server is running on port 3000\nhttp://localhost:3000` );
})