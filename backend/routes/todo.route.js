import express from "express";
import Todo from "../models/todo.model.js";
import { userMiddleware } from "../middlewares/user.js";
import { mongoose } from "mongoose";

const todoRouter = express.Router();

// GET all todos
todoRouter.get("/",userMiddleware, async (req, res) => {
  const userId = req.userId;
  console.log("=============userId=============="+userId);
  
  try {
    const todos = await Todo.find({userId : userId})

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE todo
todoRouter.post("/",userMiddleware, async (req, res) => {
  const userId = req.userId;

  const { title , description } = req.body ;

  try {
    const newTodo = await Todo.create({
      title,
      description,
      userId
    });
    res.status(201).json({
      message: "Todo ceated",
      todo : newTodo._id
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE todo
todoRouter.put("/",userMiddleware, async (req, res) => {
 const userId = req.userId;

  const { title , description , todoId} = req.body ;

  try {
    const newTodo = await Todo.updateOne({
      _id : todoId,
      userId : userId
    },{
      title : title,
      description : description ,
      userId:userId
    });
    res.status(201).json({
      message: "Todo updated",
      todo : newTodo._id
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE todo
todoRouter.delete("/",userMiddleware, async (req, res) => {
  const userId = req.userId;
  const { todoId } = req.body;
  try {
    const deletedTodo = await Todo.findByIdAndDelete({
      _id : todoId,
      userId : userId
    });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default todoRouter;
  