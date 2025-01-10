import jwt from 'jsonwebtoken'
import fs from 'fs'
import { ApiError } from './ApiError.js'
import { ErrorCodes, ErrorMessages } from '../config/codes.js'

export const SignToken = (config) => {
    const privatekey = fs.readFileSync('certs/private.pem')

    return jwt.sign(config.payload, privatekey, { algorithm: 'RS256', expiresIn: config.ext })
}

export const VerifyToken = (token) => {
    const responseData = { valid: null, error: null, data: null }

    try {
        const publickey = fs.readFileSync('certs/public.pem')
        const res = jwt.verify(token, publickey, { algorithms: ['RS256'] })
        
        responseData.valid = true
        responseData.data = res
        return responseData
    }

    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            responseData.error = new ApiError(401, ErrorCodes.Expiredtoken, ErrorMessages.Expiredtoken)
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            responseData.error = new ApiError(401, ErrorCodes.Invalidtoken, ErrorMessages.Invalidtoken)
        }
        else {
            responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        }
        responseData.valid = false
        return responseData
    }
}