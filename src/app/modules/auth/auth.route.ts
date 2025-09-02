import { Router } from 'express';
import { authController } from './auth.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../User/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { LoginValidationSchema } from './loginValidationSchem';

const router = Router()

router.post('/login', validateRequest(LoginValidationSchema), authController.login)
router.post('/logout', authController.logout)
router.get('/me', checkAuth(...Object.values(Role)), authController.getMe)


export const AuthRouter = router