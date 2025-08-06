import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
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
userRouter.post('/refresh-token', refreshToken);
userRouter.post('/logout', verifyJWT, logoutUser);

userRouter.get('/details', verifyJWT, getCurrentUser);

userRouter.put('/change-password', verifyJWT, changeCurrentPassword);
userRouter.put('/details', verifyJWT, updateAccountDetails);
userRouter.put(
  '/avatar',
  verifyJWT,
  imgUpload.single('avatar'),
  updateUserAvatar
);
userRouter.put(
  '/avatar',
  verifyJWT,
  imgUpload.single('cover'),
  updateUserCoverImage
);
