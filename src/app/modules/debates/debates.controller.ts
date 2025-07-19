import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { debateService } from './debates.service';

const createDebate = catchAsync(async (req, res) => {
  const result = await debateService.createDebateIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Debate created is successfully',
    data: result,
  });
});

export const debateController = {
  createDebate,
};
