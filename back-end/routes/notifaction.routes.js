import express from "express"
import isAuth from "../middlewares/isAuth.middleware.js"
import { getNotifaction } from "../controllers/notifaction.controllers.js"

let notifactionRoutes = express.Router()

notifactionRoutes.get("/getnotifaction",isAuth,getNotifaction)

export default notifactionRoutes