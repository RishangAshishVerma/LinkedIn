import express from 'express';
import isAuth from '../middlewares/isAuth.middleware.js';
import { getCurrentUser, getUserProfile, searchUser, updateProfile ,getSuggestedUser} from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middleware.js';

let userRouter = express.Router();

userRouter.get('/currentuser', isAuth, getCurrentUser)
userRouter.put(
    '/updateprofile',
    isAuth, upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]), updateProfile);
userRouter.get('/userprofile/:username', isAuth, getUserProfile)
userRouter.get('/search', isAuth, searchUser)
userRouter.get('/suggesteduser', isAuth, getSuggestedUser)

export default userRouter;