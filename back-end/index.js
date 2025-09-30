import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js"
import connectionRouter from "./routes/connection.routes.js"
import http from "http"
import { Server } from "socket.io";
dotenv.config();

let app = express();
let server = http.createServer(app) // setting up server for socket io
export const io = new Server(server, {
  cors: ({
    origin: "http://localhost:3000",
    credentials: true,
  })
})
app.use(express.json());
app.use(cookieParser());
let PORT = process.env.PORT || 5000;
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/connection", connectionRouter)
export const userSocketMap = new Map() // to store userId and socketId
// socket io connection

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id)
  })
  socket.on("disconnect", (socket) => {
    console.log("user disconnected ", socket.id);

  })
})
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});