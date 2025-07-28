import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password]
      .map((field) => field?.trim())
      .some((field) => !field)
  ) {
    throw new ApiError(400, 'All field are required');
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User already exists');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar file is required');
  }

  // upload them to cloudinary,avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, 'Avatar file is required');
  }

  // Create user object - Insert data into db

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while creating the user');
  }

  // Remove image from disk

  return res
    .status(201)
    .json(new ApiResponse(201, 'createdUser', 'user registerd successfully'));
});

export { registerUser };
