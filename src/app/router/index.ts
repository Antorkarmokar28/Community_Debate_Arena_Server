import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { debateRouter } from '../modules/debates/debates.routes';

const router = Router();
const moduleRouter = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/debates',
    route: debateRouter,
  },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
