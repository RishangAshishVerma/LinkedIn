import express from 'express';
import isAuth from '../middlewares/isAuth.middleware.js';
import { getCurrentUser, updateProfile } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middleware.js';

let userRouter = express.Router();

userRouter.get('/currentuser', isAuth, getCurrentUser)
userRouter.put(
    '/updateprofile',
    isAuth, upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]), updateProfile);

export default userRouter;