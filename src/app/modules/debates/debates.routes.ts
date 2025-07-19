import { Router } from 'express';
import auth from '../../middlewares/auth';
import { User_Role } from '../auth/auth.constant';
import { upload } from '../../utils/sendImageToCloudinary';
import parseJsonBody from '../../middlewares/parseJsonBody';
import validationRequest from '../../middlewares/validationRequest';
import { debateValidationSchema } from './debates.validation';
import { debateController } from './debates.controller';

const router = Router();

router.post(
  '/',
  upload.single('file'),
  parseJsonBody,
  auth(User_Role.user),
  validationRequest(debateValidationSchema.createDebateValidationSchema),
  debateController.createDebate
);

export const debateRouter = router;
