import { ErrorMessages, SuccessCodes, SuccessMessages } from "../config/codes.js"
import { DeleteRefreshToken } from "../repositories/session.repo.js"
import { LoginService, RegisterService } from "../services/auth.service.js"
import { CreateRefreshTokenService, EndSessionService } from "../services/session.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const LoginController = asyncHandler(async (req, res) => {
    const responseData = { data: null }

    const reqData = req.data

    const login = await LoginService(reqData)
    if (!login.state) {
        throw login.error
    }

    const userpayload = { uuid: login.data.uuid }
    const token = await CreateRefreshTokenService(userpayload)
    if (!token.state) {
        throw token.error
    }

    responseData.data = { uuid: login.data.uuid }

    res.cookie('refreshToken', token.data.token)
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

export const LogoutContoller = asyncHandler(async (req, res) => {
    const tokenData = req.tokenData

    const logout = await EndSessionService(tokenData)
    if (!logout.state) {
        throw logout.error
    }

    res.status(200).json(new ApiResponse(200, SuccessCodes.Logoutsuccess, SuccessMessages.Logoutsuccess))

})
