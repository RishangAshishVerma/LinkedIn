import express from "express";
import { acceptConnection, getConnectionRequest,getUserConnections, getConnectionStatus, rejectConnection, removeConnection, sendConnection } from "../controllers/connection.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js"

let connectionRouter = express.Router();

connectionRouter.get("/send/:id",isAuth,sendConnection)
connectionRouter.get("/accept/:connectionId",isAuth,acceptConnection)
connectionRouter.get("/reject/:connectionId",isAuth,rejectConnection)
connectionRouter.get("/getstatus/:userId",isAuth,getConnectionStatus)
connectionRouter.get("/remove/:userId",isAuth,removeConnection)
connectionRouter.get("/requests",isAuth,getConnectionRequest)
connectionRouter.get("/",isAuth,getUserConnections)



export default connectionRouter;