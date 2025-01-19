import { ApiError } from "../utils/ApiError.js"

export const ErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            code: err.code,
            level: err.level,
            message: err.message,
            errors: err.errors
        })
    }

    return res.status(500).json({ statusCode: 500, code: 'INTERNAL_ERROR', level: 'CRTITICAL', message: 'Unknown Server Error', errors: [], stack: err.stack })

}