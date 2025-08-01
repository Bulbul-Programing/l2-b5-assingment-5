import { Router } from 'express';
import { parcelController } from './parcel.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ParcelBookingSchema } from './parcel.validation';
import { Role } from '../User/user.interface';
import { checkAuth } from '../../middlewares/checkAuth';

const router = Router()

router.get('/me', checkAuth(Role.receiver, Role.sender), parcelController.receiverIncomingParcel)
router.post('/', checkAuth(Role.admin, Role.sender), validateRequest(ParcelBookingSchema), parcelController.createParcel)
router.patch('/updateStatus/:parcelId', checkAuth(...Object.values(Role)), parcelController.updateParcel)
router.get('/:parcelId/statusLog', checkAuth(...Object.values(Role)), parcelController.statusLog)

export const parcelRouter = router