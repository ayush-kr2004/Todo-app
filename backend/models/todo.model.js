import mongoose from "mongoose";
import Mongoose from "mongoose";
import { timeStamp } from "node:console";
import { type } from "node:os";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // 🔥 link to User
    required: true
  }
}, { timestamps: true });

const Todo = mongoose.model("Todo" , todoSchema );

export default Todo;