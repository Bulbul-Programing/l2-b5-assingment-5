import { Router } from 'express';
import { parcelController } from './parcel.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ParcelBookingSchema } from './parcel.validation';
import { Role } from '../User/user.interface';
import { checkAuth } from '../../middlewares/checkAuth';

const router = Router()

router.post('/', checkAuth(Role.admin, Role.sender), validateRequest(ParcelBookingSchema), parcelController.createParcel)

export const parcelRouter = router