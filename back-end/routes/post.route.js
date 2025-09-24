import express from "express"
import isAuth from"../middlewares/isAuth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
import { comment, createPost, getPost, like } from "../controllers/post.controoller.js"
import { get } from "mongoose"

const postRouter = express.Router()

postRouter.post("/create",isAuth,upload.single("image"),createPost)
postRouter.get("/getpost",isAuth,getPost)
postRouter.get("/like/:id",isAuth,like)
postRouter.post("/comment/:id",isAuth,comment)

export default postRouter