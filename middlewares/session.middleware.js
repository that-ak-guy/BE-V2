import { VerifyToken } from "../utils/token.util.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { VerifyAccessToken, VerifyRefreshToken } from "../services/session.service.js"
import { ErrorCodes, ErrorMessages } from "../config/codes.js"

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

export const AuthSessionVerifyIn = asyncHandler(async (req, res, next) => {
    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (!accesstoken && !refreshtoken) {
        next()
    }

    else {
        throw new ApiError(409, 'USER_CONFLICT', 'User already logged in.')
    }
})

export const AuthSessionVerifyOut = asyncHandler(async (req, _, next) => {
    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (accesstoken && refreshtoken) {
        next()
    }
    else {
        throw new ApiError(401, 'INVALID_SESSION', 'Tokens not found for valid session')
    }
})

export const RefreshSessionVerify = asyncHandler(async (req, _, next) => {
    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (accesstoken) {
        const accessdecoded = await VerifyAccessToken(accesstoken)
        if (!accessdecoded.state) {
            throw accessdecoded.error
        }
        throw new ApiError(409, ErrorCodes.Userconflict, ErrorMessages.Userconflict)
    }

    else if (!refreshtoken) {
        throw new ApiError(401, ErrorCodes.Notoken, ErrorMessages.Notoken)
    }

    const refreshdecoded = await VerifyRefreshToken(refreshtoken)
    if (!refreshdecoded.state) {
        throw refreshdecoded.error
    }

    req.tokenData = refreshdecoded.data
    next()
})