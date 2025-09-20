import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
dotenv.config();

let app = express();
app.use(express.json());
app.use(cookieParser());
let PORT = process.env.PORT || 5000;
app.use("/api/auth", authRouter);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});