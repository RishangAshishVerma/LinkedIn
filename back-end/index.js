import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();

let app = express();
let PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});