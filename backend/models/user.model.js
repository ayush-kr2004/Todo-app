import mongoose from "mongoose";
import { timeStamp } from "node:console";
import { type } from "node:os";

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required: true
  },
  email : {
    type : String,
    required : true,
    unique : true 
  },
  password: {
    type : String ,
    required : true
  }
},{timestamps : true})

const User = mongoose.model("User" , userSchema );

export default User;