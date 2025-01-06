import { VerifyToken } from "../utils/token.util.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

export const SessionVerify = asyncHandler(async (req, _, next) => {
    const token = req.header("Authorization")

    if (!token) {
        throw new ApiError(401, 'NO_TOKEN', 'Access Token Not Found')
    }
    else {
        try {
            const decoded = VerifyToken(token)
            if (decoded.valid === true) {
                req.tokenData = decoded.data
                next()
            }

            else {
                if (decoded.error instanceof jwt.TokenExpiredError) {
                    next(new ApiError(401, 'EXPIRED_TOKEN', 'Access token expired.'))
                }
                else if (decoded.error instanceof jwt.JsonWebTokenError) {
                    next(new ApiError(401, 'INVALID_TOKEN', 'Invalid token.'))
                }
                else {
                    next(new ApiError(500, 'INTERNAL_ERROR', 'Unknown internal server error.', [decoded.error]))
                }
            }
        }
        catch (error) {
            throw new ApiError(500, 'INTERNAL_ERROR', 'Unknown internal server error.', [error.stack])
        }
    }
})

export const AuthSessionVerify = asyncHandler(async (req, _, next) => {
    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (!accesstoken && !refreshtoken) {
        req.tokenState = false
        next()
    }

    
})