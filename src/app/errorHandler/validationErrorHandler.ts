import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.type";

export const ValidationErrorHandler = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    console.log(err);

    const errorSources: TErrorSources[] = []
    const errors = Object.values(err.errors)

    errors.forEach((errorObject: any) => errorSources.push({
        path: errorObject.path,
        message: errorObject.message
    }))

    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    }
}