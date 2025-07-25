import { Router } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import parseJsonBody from '../../middlewares/parseJsonBody';
import validationRequest from '../../middlewares/validationRequest';
import { authValidationSchema, userValidationSchema } from './auth.validation';
import { authController } from './auth.controller';

const router = Router();
router.post(
  '/register',
  upload.single('file'),
  parseJsonBody,
  validationRequest(userValidationSchema),
  authController.registerUser
);

router.post(
  '/login',
  validationRequest(authValidationSchema),
  authController.userLogin
);

export const authRouter = router;
