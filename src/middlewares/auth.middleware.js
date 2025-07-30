import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const bearerToken = req.header('Authorization');
    const accessToken = bearerToken?.split(' ')[1];

    if (!accessToken) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error.message || 'Invalid Access Token');
  }
};
