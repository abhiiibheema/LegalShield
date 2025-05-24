import { Request,Response,NextFunction } from "express";
import { config } from "dotenv";
import jwt from 'jsonwebtoken'

config({path:'../../.env'})

const secret : string = process.env.JWT_SECRET  || ""


export default function(req : Request ,res : Response,next : NextFunction) : void | Response{
  try{
    const token  = req.headers.authorization
    if(!token) return res.json({msg:"Invalid token"})
    
    const arr: Array<string> = token.split(' ');
    if(arr[0] === 'Barier'){
      const data = jwt.verify(arr[1], secret, {maxAge:"1hr"})
      next();
      return;
    } 
    else{
      return res.json({msg:"Invalid token"})
    } 
  }
  catch(err : any){
    return res.status(404).json({msg : "Wrong token"})
  }
}