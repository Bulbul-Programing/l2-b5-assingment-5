import { Router } from 'express';
import { createUserValidationSchema } from './user.validation';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';

const router = Router()

router.post('/register', validateRequest(createUserValidationSchema), userController.createUser)


export const UserRoutes = router