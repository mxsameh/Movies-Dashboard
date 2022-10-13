import express, { Request, Response, Express } from 'express'

const app : Express = express()

app.get('/',(req : Request,res : Response) =>
{
  res.send('Wellcome!')
})

const port = 3000
app.listen(port, () =>
{
  console.log( `Server is running on port 3000\nhttp://localhost:3000` );
})