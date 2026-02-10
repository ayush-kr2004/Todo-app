import express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRouter from "./routes/todo.route.js"
import userRoute from "./routes/user.route.js";


dotenv.config();

const app = express();

app.use(express.json());     

app.use("/api/v1/user", userRoute)
app.use("/api/v1/todo",todoRouter);

app.listen (5000 , ()=>{
  connectDB();
  console.log("app is listening on http://localhost:5000");
  
})