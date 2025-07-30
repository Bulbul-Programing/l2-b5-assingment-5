
export enum Role {
    ADMIN = "ADMIN",
    SENDER = "SENDER",
    RECEIVER = "RECEIVER",
}

export type TUser = {
    name: string,
    email: string,
    password: string,
    phone?: string,
    role: Role,
    isBlocked: boolean
}