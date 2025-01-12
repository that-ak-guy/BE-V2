import { v1 } from "uuid";
import { ApiError } from "./ApiError.js";
import { ErrorCodes, ErrorMessages } from "../config/codes.js";

export const GenerateLogID = async () => {
    const responseData = { state: false, data: {}, error: null }

    try {
        const id = v1()
        responseData.state = true
        responseData.data = { id }
    }
    catch (error) {
        console.log(error)
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}