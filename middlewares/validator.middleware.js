import isEmail from "validator/lib/isEmail.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";
import { ErrorCodes, ErrorMessages } from "../config/codes.js";
import { RegisterSchema } from "../models/register.model.js";
import { LoginSchema } from "../models/login.model.js";


export const LoginValidator = asyncHandler(async (req, _, next) => {

    const reqData = req.body

    if (!reqData || Object.keys(reqData).length === 0) {
        throw new ApiError(400, ErrorCodes.Datanotfound, ErrorMessages.Datanotfound, 'WARNING')
    }

    const { value, error } = LoginSchema.validate(reqData, {
        stripUnknown: true,
        abortEarly: false
    })

    if (error) {
        throw new ApiError(400, ErrorCodes.InvalidData, ErrorCodes.InvalidData, 'WARNING', error.details)
    }

    req.data = value
    next()
})

export const RegisterValidator = asyncHandler(async (req, res, next) => {

    const reqData = req.body

    if (!reqData || Object.keys(reqData).length === 0) {
        throw new ApiError(400, ErrorCodes.Datanotfound, ErrorMessages.Datanotfound, 'WARNING')
    }

    const { value, error } = RegisterSchema.validate(reqData, {
        abortEarly: false,
        stripUnknown: true
    })

    if (error) {
        throw new ApiError(400, ErrorCodes.InvalidData, ErrorMessages.InvalidData, 'WARNING', error.details)
    }

    req.data = value

    next()
})