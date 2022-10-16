import express, { Request, Response, Express } from 'express'
import categoriesRoutes from './handlers/categoriesHandler'
import moviesRoutes from './handlers/moviesHandler'
import usersRoutes from './handlers/usersHandler'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()

const app : Express = express()

// MIDDLEWARES
app.use(cors())
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

const port = process.env.PORT || 3333
app.listen(port, () =>
{
  console.log( `Server is running on port ${port}\nhttp://localhost:${port}` );
})