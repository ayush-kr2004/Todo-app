import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import todoRouter from "./routes/todo.route.js"
import { userRouter } from "./routes/user.route.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/todo", todoRouter);

app.listen(5000, () => {
  connectDB();
  console.log("app is listening on http://localhost:5000");

})