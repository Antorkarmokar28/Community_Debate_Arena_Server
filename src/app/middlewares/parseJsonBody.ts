import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

const parseJsonBody = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.data) {
      req.body = JSON.parse(req.body?.data);
    }
    next();
  }
);

export default parseJsonBody;
