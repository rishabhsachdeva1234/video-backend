import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';
import { imgUpload } from '../middlewares/multer.middleware.js';

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
