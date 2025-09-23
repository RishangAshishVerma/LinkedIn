import express from "express"
import isAuth from"../middlewares/isAuth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
import { createPost, getPost } from "../controllers/post.controoller"
import { get } from "mongoose"

const postRouter = express.Router()

postRouter.post("/create",isAuth,upload.single("image"),createPost)
postRouter.post("/getpost",isAuth,getPost)

export default postRouter