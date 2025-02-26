import { ErrorCodes, ErrorMessages } from "../config/codes.js"
import { CreateUserByUserID, FindHashByUuid, FindUserByEmail } from "../repositories/auth.repo.js"
import { ApiError } from "../utils/ApiError.js"
import { HashPassword, VerifyPassword } from "../utils/HashUtil.js"
import { InternalResponse } from "../utils/InternalDataUtil.js"
import { GenerateUUID } from "../utils/uuidUtil.js"


export const LoginService = async (loginData) => {
    const responseData = new InternalResponse()

    const { email, password } = loginData

    const emailData = await FindUserByEmail(email)
    if (!emailData.state) {
        responseData.error = emailData.error
        return responseData
    }

    const uuid = emailData.data.uuid
    const authData = await FindHashByUuid(uuid)
    if (!authData.state) {
        responseData.error = authData.error
        return responseData
    }

    const hash = authData.data.hash
    const userValid = await VerifyPassword(password, hash)
    if (!userValid.state) {
        responseData.error = userValid.error
        return responseData
    }

    responseData.state = true
    responseData.data = { uuid }

    return responseData
}

export const RegisterService = async (registerData) => {
    const responseData = new InternalResponse()

    const { email, password } = registerData

    const emailcheck = await FindUserByEmail(email)
    if (!emailcheck.state) {
        if (emailcheck.error.code === ErrorCodes.Usernotfound) {

        }
        else {
            responseData.error = emailcheck.error
            return responseData
        }
    }

    else {
        responseData.error = new ApiError(400, ErrorCodes.Emailexists, ErrorMessages.Emailexists, 'WARNING')
        return responseData
    }

    const hash = await HashPassword(password)
    if (!hash.state) {
        responseData.error = hash.error
        return responseData
    }

    const uuid = GenerateUUID()
    if (!uuid.state) {
        responseData.error = uuid.error
        return responseData
    }

    const userData = { uuid: uuid.data.id, email: email, createdAt: new Date().toISOString(), changedAt: new Date().toISOString(), hash: hash.data.hashed }
    const register = await CreateUserByUserID(userData)
    if (!register.state) {
        responseData.error = register.error
        return responseData
    }

    responseData.state = true
    responseData.data = { uuid: uuid.data.id }

    return responseData
}
