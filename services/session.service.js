import { FindSessionByToken } from "../repositories/session.repo.js"
import { SignToken } from "../utils/token.util.js"

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
    const responseData = { status: null }
    const findres = await FindSessionByToken(token)

    // if (findres.status === 200) {
    //     if (findres.data.ext.S < Date.now()) {
    //         const 
    //     }
    // }

}

export const VerifyRefreshToken = async (token) => {
    const responseData = { status: null }

    return responseData
}

export const DeleteSession = async (tokens) => {
    const responseData = { status: null }

    responseData
}

