import { ErrorCodes, SuccessCodes, SuccessMessages } from "../config/codes.js"
import { LoginService, RegisterService } from "../services/auth.service.js"
import { CreateRefreshToken } from "../services/session.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const LoginController = asyncHandler(async (req, res) => {
    const responseData = { userData: null }

    const loginData = req.body

    const userData = await LoginService(loginData)
    if (!userData.state) {
        throw userData.error
    }

    const userpayload = { uuid: userData.data.uuid }
    const token = await CreateRefreshToken(userpayload)
    if (!token.state) {
        throw token.error
    }

    responseData.userData = userData

    res.cookie('refreshToken', token.data)
    res.status(200).json(new ApiResponse(200, SuccessCodes.Loginsuccess, SuccessMessages.Loginsuccess, responseData))
})

export const RegisterController = asyncHandler(async (req, res) => {

    const userData = req.body


})

export const LogoutContoller = (req, res) => {

}
