import express from "express";
import { connectDB } from "./config/mongodb.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
dotenv.config();

const app = express();

// api endpoints
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,

    message,

    statusCode,
  });
});

await connectDB();

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
