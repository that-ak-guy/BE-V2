import { RegisterService } from "../services/auth.service.js"
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
    try {
        const responseData = await RegisterService(req.body)

    }
    catch (err) {
        console.log(err)
    }

    res.send('HIHINIINJVRIEV')

})

export const LogoutContoller = (req, res) => {

}
