import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRouter } from '../modules/auth/auth.route';
import { parcelRouter } from '../modules/parcel/parcel.route';
import { couponRoute } from '../modules/coupon/coupon.route';

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRouter
    },
    {
        path: "/parcels",
        route: parcelRouter
    },
    {
        path: "/coupon",
        route: couponRoute
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})