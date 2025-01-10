import { FindSessionByToken } from "../repositories/session.repo.js"
import { SignToken, VerifyToken } from "../utils/token.util.js"



export const CreateAccessToken = async (userData) => {
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

export const VerifyAccessToken = async (token) => {
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

export const CreateRefreshToken = async (userData) => {
    const responseData = { state: false, data: null, error: null }
    const tokenConfig = { payload: userData, ext: process.env.REFRESH_TOKEN_EXT }

    const newtoken = SignToken(tokenConfig)
    if (!newtoken.state) {
        responseData.error = newtoken.error
        return responseData
    }

    

    responseData.state = true
    responseData.data = newtoken.data


    return responseData
}

export const VerifyRefreshToken = async (token) => {
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

