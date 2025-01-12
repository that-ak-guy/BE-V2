import jwt from 'jsonwebtoken'
import fs from 'fs'
import { ApiError } from './ApiError.js'
import { ErrorCodes, ErrorMessages } from '../config/codes.js'

export const SignToken = (tokenConfig) => {
    const responseData = { state: false, data: {}, error: null }

    try {
        const privatekey = fs.readFileSync('certs/private.pem')
        const res = jwt.sign(tokenConfig.payload, privatekey, { algorithm: 'RS256', expiresIn: tokenConfig.ext })

        responseData.state = true
        responseData.data = { token: res }
    }

    catch (error) {
        console.log(error)
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}

export const VerifyToken = (token) => {
    const responseData = { state: false, error: null, data: null }

    try {
        const publickey = fs.readFileSync('certs/public.pem')
        const res = jwt.verify(token, publickey, { algorithms: ['RS256'] })

        responseData.state = true
        responseData.data = res
    }

    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            responseData.error = new ApiError(401, ErrorCodes.Expiredtoken, ErrorMessages.Expiredtoken)
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            responseData.error = new ApiError(401, ErrorCodes.Instatetoken, ErrorMessages.Instatetoken)
        }
        else {
            responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        }
    }

    return responseData
}