import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";


const authenticate = (req : Request, res : Response, next : NextFunction) =>
{
  // Get token from request header
  const token = req.headers.authorization?.split(' ')[1] as string
  const isValid = verifyToken(token)

  // Check if the token is valid
  if(isValid)
  {
    next()
  }
  else
  {
    res.status(401).json('not authorized')
  }
}

export default authenticate
