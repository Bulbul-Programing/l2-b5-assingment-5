import { Role } from "../modules/User/user.interface"

export type TJwtPayload = {
    userId: string,
    email: string,
    role: Role 
}