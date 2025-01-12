import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { VerifyAccessTokenService, VerifyRefreshTokenService } from "../services/session.service.js"
import { ErrorCodes, ErrorMessages } from "../config/codes.js"


export const SessionVerify = asyncHandler(async (req, _, next) => {
    const token = req.header("Authorization")

    if (!token) {
        throw new ApiError(401, ErrorCodes.Notoken, ErrorMessages.Notoken)
    }

    const decoded = await VerifyAccessTokenService(token)
    if (!decoded.state) {
        throw decoded.error
    }

    req.tokenData = decoded.data
    next()
})

export const AuthSessionVerifyIn = asyncHandler(async (req, res, next) => {
    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (accesstoken) {
        const accessdecoded = await VerifyAccessTokenService(accesstoken)
        if (!accessdecoded.state) {
            throw accessdecoded.error
        }
        throw new ApiError(409, ErrorCodes.Userconflict, ErrorMessages.Userconflict)
    }
    else if (refreshtoken) {
        const refreshdecoded = await VerifyRefreshTokenService(refreshtoken)
        if (!refreshdecoded.state) {
            throw refreshdecoded.error
        }
        throw new ApiError(409, ErrorCodes.Userconflict, ErrorMessages.Userconflict)
    }

    next()
})

export const AuthSessionVerifyOut = asyncHandler(async (req, _, next) => {
    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (!accesstoken) {
        throw new ApiError(401, ErrorCodes.Notoken, ErrorMessages.Notoken)
    }
    else if (!refreshtoken) {
        throw new ApiError(401, ErrorCodes.Notoken, ErrorMessages.Notoken)
    }

    const accessdecoded = await VerifyAccessTokenService(accesstoken)
    if (!accessdecoded.state) {
        throw accessdecoded.error
    }

    const refreshdecoded = await VerifyRefreshTokenService(refreshtoken)
    if (!refreshdecoded.state) {
        throw refreshdecoded.error
    }

    next()
})

export const RefreshSessionVerify = asyncHandler(async (req, _, next) => {
    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (accesstoken) {
        const accessdecoded = await VerifyAccessTokenService(accesstoken)
        if (!accessdecoded.state) {
            throw accessdecoded.error
        }
        throw new ApiError(409, ErrorCodes.Userconflict, ErrorMessages.Userconflict)
    }

    else if (!refreshtoken) {
        throw new ApiError(401, ErrorCodes.Notoken, ErrorMessages.Notoken)
    }

    const refreshdecoded = await VerifyRefreshTokenService(refreshtoken)
    if (!refreshdecoded.state) {
        throw refreshdecoded.error
    }

    req.tokenData = refreshdecoded.data
    next()
})