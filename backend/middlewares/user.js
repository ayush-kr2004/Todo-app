import  jwt from "jsonwebtoken";
import { JWT_SECRETE } from "../routes/user.route.js";

const userMiddleware = (req,res,next)=>{
  const token = req.headers.token;

  const decoded = jwt.verify(token , JWT_SECRETE);

  if (decoded){
    req.userId = decoded.id;
    next();
  }else{
    res.json({message : "you are not signin "})
  }
} 

export { userMiddleware }