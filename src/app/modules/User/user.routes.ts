import { Router } from 'express';
import { createUserValidationSchema, updateUserValidationSchema } from './user.validation';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from './user.interface';

const router = Router()

router.post('/register', validateRequest(createUserValidationSchema), userController.createUser)
router.put('/update/:userId', checkAuth(...Object.values(Role)), validateRequest(updateUserValidationSchema), userController.updateUser)
router.get('/receiver', checkAuth('admin', 'sender'), userController.getReceiver)
router.get('/all-users', checkAuth('admin'), userController.getAllUsers)
router.delete('/:id', checkAuth('admin'), userController.deleteUser)

export const UserRoutes = router