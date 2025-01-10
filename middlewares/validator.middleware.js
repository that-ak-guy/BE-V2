import isEmail from "validator/lib/isEmail.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";


export const LoginValidator = asyncHandler(async (req, _, next) => {
    // const { userid, password } = req.body
    // if (isEmail(userid)) {
    //     req.body.id = 'email'
    // }
    // else if (isMobilePhone(userid)) {
    //     req.body.id = 'phone'
    // }
    // else {
    //     throw new ApiError(400, 'INVALID_USERID', 'Invalid Userid')
    // }
    // if (!password) {
    //     throw new ApiError(400, 'MISSING_PASSWORD', 'Password is required')
    // }


})

export const RegisterValidator = asyncHandler(async (req, _, next) => {

    const { username, email, phone, city, country, password } = req.body

    if (!username || !email || !phone || !city || !country || !password) {
        throw new ApiError(400, 'MISSING_FIELDS', 'All fields are required')
    }
    else {
        if (!isEmail(email)) {
            throw new ApiError(400, 'INVALID_EMAIL', 'Invalid Email')
        }
        else if (!isStrongPassword(password)) {
            throw new ApiError(400, 'INVALID_PASSWORD', 'Invalid Password')
        }
        else {
            next()
        }
    }
})

export const RefreshValidator = asyncHandler(async (req, _, next) => {
    
})