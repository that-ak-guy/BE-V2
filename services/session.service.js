import { FindSessionByToken } from "../repositories/session.repo.js"
import { ApiError } from "../utils/ApiError.js"
import { SignToken, VerifyToken } from "../utils/token.util.js"

export const CreateSession = async (userData) => {
    const responseData = { status: null, accessToken: null, refreshToken: null }

    const accessTokenConfig = { payload: userData, ext: '15m' }
    const refreshTokenConfig = { payload: userData, ext: '7d' }

    responseData.accessToken = SignToken(accessTokenConfig)
    responseData.refreshToken = SignToken(refreshTokenConfig)
    responseData.status = 200



    return responseData
}

export const CreateAccessToken = async () => {
    const responseData = { status: null, accessToken: null }

    return responseData
}

export const VerifyAccessToken = async (token) => {
    const responseData = { state: false, data: null, error: null }

    const decoded = VerifyToken(token)
    if (!decoded.valid) {
        responseData.error = decoded.error
        return responseData
    }
    responseData.state = true
    responseData.data = decoded.data
    return responseData
}

export const VerifyRefreshToken = async (token) => {
    const responseData = { state: false, data: null, error: null }

    const decoded = VerifyToken(token)
    if (!decoded.valid) {
        responseData.error = decoded.error
        return responseData
    }

    const dbData = await FindSessionByToken(token)
    if (!dbData.state) {
        responseData.error = dbData.error
        return responseData
    }

    responseData.state = true
    responseData.data = decoded.data
    return responseData
}

export const DeleteSession = async (tokens) => {
    const responseData = { status: null }

    responseData
}

