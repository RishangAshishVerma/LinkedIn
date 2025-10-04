import express from "express"
import isAuth from "../middlewares/isAuth.middleware.js"
import { clearAllNotifaction, deleteNotifaction, getNotifaction } from "../controllers/notifaction.controllers.js"

let notifactionRoutes = express.Router()

notifactionRoutes.get("/getnotifaction",isAuth,getNotifaction)
notifactionRoutes.get("/deletenotifaction/:id",isAuth,deleteNotifaction)
notifactionRoutes.get("/",isAuth,clearAllNotifaction)

export default notifactionRoutes