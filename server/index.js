import express from "express";
import { connectDB } from "./config/mongodb.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
await connectDB();
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
