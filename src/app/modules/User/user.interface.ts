
export enum Role {
    admin = "admin",
    sender = "sender",
    receiver = "receiver",
}

export type TUser = {
    name: string,
    email: string,
    password: string,
    address : string,
    phone: string,
    role: Role,
    isBlocked: boolean
}