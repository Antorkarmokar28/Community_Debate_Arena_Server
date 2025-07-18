import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { IUser } from './auth.interface';
import { User } from './auth.model';

const userRegisterIntoDB = async (payload: IUser) => {
  const { email } = payload;
  const user = await User.findOne({ email });
  // if user already regiter then throw the error
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User already exists');
  }
  // create user in DB
  const newUser = await User.create(payload);

  return newUser;
};

export const authService = {
  userRegisterIntoDB,
};
