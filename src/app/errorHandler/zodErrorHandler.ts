import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.type";
import { issue } from "zod/v4/core/util.cjs";

export const ZodErrorHandler = (err: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSources[] = []

    err.issues.forEach((issue: any) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        })
    })
    return {
        statusCode: 400,
        message: "Zod Validation Error",
        errorSources
    }
}