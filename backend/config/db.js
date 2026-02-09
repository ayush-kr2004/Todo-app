import mongoose from "mongoose";

export const connectDB = async ()=>{
  try {
    // console.log(process.env.MONGO_URI+"mongo uri ========================================================================");
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connection is done ${conn.connection.host}`);
    
  } catch (error) {
    console.log(error);
    process.exit(1);
    
  }
}