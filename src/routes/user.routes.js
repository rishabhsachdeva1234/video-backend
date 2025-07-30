import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/user.controller.js';
import { imgUpload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

export const userRouter = Router();

userRouter.post(
  '/register',
  imgUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  registerUser
);

userRouter.post('/login', loginUser);
userRouter.post('/logout', verifyJWT, logoutUser);
