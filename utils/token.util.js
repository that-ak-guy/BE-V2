import jwt from 'jsonwebtoken'
import fs from 'fs'

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
        responseData.valid = false
        responseData.error = error
        return responseData
    }
}