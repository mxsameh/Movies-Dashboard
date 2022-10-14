import express, { Request, Response, Express } from 'express'
import usersRoutes from './handlers/usersHandler'

const app : Express = express()

app.get('/',(req : Request,res : Response) =>
{
  res.send('Wellcome!')
})

app.use(express.json())
usersRoutes(app);

const port = 3000
app.listen(port, () =>
{
  console.log( `Server is running on port 3000\nhttp://localhost:3000` );
})