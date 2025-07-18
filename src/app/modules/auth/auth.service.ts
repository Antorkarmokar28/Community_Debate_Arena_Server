/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { ILoginUser, IUser } from './auth.interface';
import { User } from './auth.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import jwt from 'jsonwebtoken';
import config from '../../config';
// user registration
const userRegisterIntoDB = async (file: any, payload: IUser) => {
  const { email } = payload;
  const user = await User.findOne({ email });
  // if user already regiter then throw the error
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User already exists');
  }
  const avatarName = payload?.name;
  const path = file?.path;
  const { secure_url }: any = await sendImageToCloudinary(avatarName, path);
  payload.avatar = secure_url;
  // create user in DB
  const newUser = await User.create(payload);

  return newUser;
};

// user login
const userLogin = async (payload: ILoginUser) => {
  //find by user with email
  const user = await User.isUserExitsByEmail(payload.email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  //checking user password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid credentials' );
  }
  // create access token
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '30d',
    }
  );

  return { accessToken, refreshToken };
};

export const authService = {
  userRegisterIntoDB,
  userLogin,
};
