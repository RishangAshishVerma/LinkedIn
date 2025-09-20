import express from 'express';
import { logIn, logOut, signUp } from '../controllers/user.contoller.js';


const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login',logIn );
authRouter.post('/logout',logOut );

export default authRouter;