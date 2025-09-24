import express from "express";
import { sendConnection } from "../controllers/connection.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js"

let connectionRouter = express.Router();

connectionRouter.get("/send",isAuth,sendConnection)



export default connectionRouter;