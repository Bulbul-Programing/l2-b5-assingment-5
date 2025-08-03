"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/User/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const parcel_route_1 = require("../modules/parcel/parcel.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRouter
    },
    {
        path: "/parcels",
        route: parcel_route_1.parcelRouter
    },
    {
        path: "/coupon",
        route: coupon_route_1.couponRoute
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
