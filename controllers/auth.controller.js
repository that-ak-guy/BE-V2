import { ErrorCodes, SuccessCodes, SuccessMessages } from "../config/codes.js"
import { LoginService, RegisterService } from "../services/auth.service.js"
import { CreateRefreshTokenService } from "../services/session.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const LoginController = asyncHandler(async (req, res) => {
    const responseData = { data: null }

    const loginData = req.body

    const userData = await LoginService(loginData)
    if (!userData.state) {
        throw userData.error
    }

    const userpayload = { uuid: userData.data.uuid }
    const token = await CreateRefreshTokenService(userpayload)
    if (!token.state) {
        throw token.error
    }

    responseData.data = userData

    res.cookie('refreshToken', token.data)
    res.status(200).json(new ApiResponse(200, SuccessCodes.Loginsuccess, SuccessMessages.Loginsuccess, responseData))
})

export const RegisterController = asyncHandler(async (req, res) => {
    const responseData = { data: null }

    const registerData = req.body

    const register = await RegisterService(registerData)

    if (!register.state) {
        throw register.error
    }

    const userpayload = { uuid: register.data.uuid }
    const refreshtoken = await CreateRefreshTokenService(userpayload)
    if (!refreshtoken.state) {
        throw refreshtoken.error
    }
    responseData.data = register.data
    res.cookie('refreshToken', refreshtoken.data.token)
    res.status(200).json(new ApiResponse(200, SuccessCodes.Registersuccess, SuccessMessages.Registersuccess, responseData.data))

})

export const LogoutContoller = (req, res) => {

}
