import { Response } from "express";
import { envVars } from "../config/env";

type AuthToken = {
    accessToken?: string,
    refreshToken?: string
}

export const setCookies = (res: Response, token: AuthToken) => {
    if (token.accessToken) {
        res.cookie('accessToken', token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
    }
    if (token.refreshToken) {
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
    }
}