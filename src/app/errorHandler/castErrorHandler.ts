import { TGenericErrorResponse } from "../interface/error.type";


export const castErrorHandler = (err: any): TGenericErrorResponse => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectID. Please provide a valid id"
    }
}