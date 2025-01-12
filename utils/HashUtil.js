import { compare, hash } from "bcrypt"
import { ApiError } from "./ApiError.js"
import { ErrorCodes, ErrorMessages } from "../config/codes.js"

const saltRounds = 10

export const HashPassword = async (password) => {
    const responseData = { state: false, data: {}, error: null }

    try {
        const hashed = await hash(password, saltRounds)

        responseData.state = true
        responseData.data = { hashed }
    }

    catch (error) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}

export const VerifyPassword = async (password, hash) => {
    const responseData = { state: false, data: null, error: null }

    try {
        const result = await compare(password, hash)
        if (!result) {
            responseData.error = new ApiError(401, ErrorCodes.InvalidPass, ErrorMessages.InvalidPass)
        }
        else {
            responseData.state = true
            responseData.data = result
        }
    }
    catch (error) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}