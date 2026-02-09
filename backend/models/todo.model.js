import mongoose from "mongoose";
import Mongoose from "mongoose";
import { timeStamp } from "node:console";
import { type } from "node:os";

const todosSchema = new mongoose.Schema({
  text : {
    type : String,
    required: true
  },
  completed : {
    type : Boolean,
    default : false
  },
},{timestamps : true})

const Todo = mongoose.model("Todo" , todosSchema );

export default Todo;