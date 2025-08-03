import { Router } from 'express';
import { couponController } from './coupon.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../User/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { couponValidationSchema } from './coupon.validation';

const router = Router()

router.post('/create', checkAuth(Role.admin), validateRequest(couponValidationSchema), couponController.creteCoupon)
router.post('/:code', couponController.getSingleCoupon)

export const couponRoute = router