import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.userRegisterIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Student register is successfully',
    data: result,
  });
});

export const authController = {
  registerUser,
};
