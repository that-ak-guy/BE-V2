import { FindSession } from "../repositories/auth.repo.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const LoginController = asyncHandler(async (req, res) => {
    const responseData = { userData: null, authData: null }

    const accesstoken = req.header('Authorization')
    const refreshtoken = req.cookies.refreshToken

    if (!accesstoken && !refreshtoken) {

    }

    else {
        
    }
})

export const SignUpController = asyncHandler(async (req, res) => {
    if (!req.tokenData) {

    }
    else {
        return res.status(409).json(new ApiResponse(409, 'SIGNUP_CONFLICT', 'User already logged in'))
    }
})

export const LogoutContoller = (req, res) => {

}
