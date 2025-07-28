import { userRouter } from './user.routes.js';
// import { videoRouter } from './video.routes.js';
import { Router } from 'express';

export const routes = Router();

routes.use('/v1/users', userRouter);
// routes.use('/video', videoRouter);
