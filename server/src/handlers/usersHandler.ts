import { Application, Request, Response } from "express";
import Users from "../models/userModel"
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { createToken } from "../utils/jwt";

const usersTable = new Users;

// View all users
// this should return an array of all users
const index = async (req : Request, res : Response) =>
{
  try
  {
    const users = await usersTable.index()
    res.status(200).json(users)
  }
  catch(err)
  {
    res.status(404).json(`${err}`)
  }

}

// Create a new user
// this should return a message "created successfully"
const create = async (req : Request, res : Response) : Promise <void> =>
{
  // get user data from the request body 
  const user = req.body.user;
  // hashing user password for security
  user.password = hashPassword(user.password)
  try
  {
    const createdUser = await usersTable.create(user);
    if(createdUser && createdUser.email == user.email)
    {
      res.status(200).json('created successfully')
    }
  }
  catch(err)
  {
    res.status(404).json(`${err}`)
  }
}

const authenticate = async (req : Request, res : Response) : Promise <void> =>
{
  const email = req.body.user.email
  const password = req.body.user.password

  try
  {
    const user  = await usersTable.show(email)
    const isValid = comparePassword(password, user.password)
    if(isValid)
    {
      const token = createToken(user)
      res.status(200).json({authenticated : true, token})
    }
    else
    {
      res.status(401).json({authenticated : false})
    }
  }
  catch(err)
  {
    res.status(500).json(`couldn't authenticate user ${err}`)
  }
}


const usersRoutes = (app : Application) : void =>
{
  app.get('/users',index)
  app.post('/users',create)
  app.post('/users/authenticate',authenticate)
}

export default usersRoutes