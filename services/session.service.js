import { CreateSessionByToken, FindSessionByToken } from "../repositories/session.repo.js"
import { SignToken, VerifyToken } from "../utils/token.util.js"



export const CreateAccessTokenService = async (userData) => {
    const responseData = { state: false, data: null, error: null }
    const tokenConfig = { payload: userData, ext: process.env.ACCESS_TOKEN_EXT }
    const newtoken = SignToken(tokenConfig)
    if (!newtoken.state) {
        responseData.error = newtoken.error
        return responseData
    }

    responseData.state = true
    responseData.data = newtoken.data

    return responseData
}

export const VerifyAccessTokenService = async (token) => {
    const responseData = { state: false, data: null, error: null }

    const decoded = VerifyToken(token)
    if (!decoded.state) {
        responseData.error = decoded.error
        return responseData
    }
    responseData.state = true
    responseData.data = decoded.data
    return responseData
}

export const CreateRefreshTokenService = async (userData) => {
    const responseData = { state: false, data: {}, error: null }
    const tokenConfig = { payload: userData, ext: process.env.REFRESH_TOKEN_EXT }

    const newtoken = SignToken(tokenConfig)
    if (!newtoken.state) {
        responseData.error = newtoken.error
        return responseData
    }

    const sessionData = { uuid: userData.uuid, token: newtoken.data.token, ext: (Date.now() + (15 * 24 * 60 * 60 * 1000)) }
    const dbData = await CreateSessionByToken(sessionData)
    if (!dbData.state) {
        responseData.error = dbData.error
        return responseData
    }

    responseData.state = true
    responseData.data = newtoken.data

    return responseData
}

export const VerifyRefreshTokenService = async (token) => {
    const responseData = { state: false, data: null, error: null }

    const decoded = VerifyToken(token)
    if (!decoded.state) {
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


