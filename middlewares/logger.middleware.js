import { ErrorCodes, ErrorMessages } from "../config/codes.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiLog } from "../utils/ApiLog.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { GenerateLogID } from "../utils/LogidUtil.js";


export const ErrorLogID = asyncHandler(async (req, __, next) => {
    const id = await GenerateLogID()
    if (!id.state) {
        throw new ApiError(500, ErrorCodes.Internalerror, ErrorCodes.Internalerror)
    }
    req.logid = id.data.id
    next()
})

export const ErrorLogger = async (err, req, res, next) => {

    // const reqData = { path: req.path, body: req.body, method: req.method }
    // const resData = {}
    // const errData = { errors: [err], stack: err.stack }

    // if (err instanceof ApiError) {
    //     const data = new ApiLog(req.logid, 'dev', err.statusCode, err.code, err.message, reqData, resData, errData, req.uuid)
    //     console.log(data)
    // }
    // next(err)

    async function test(params) {
        console.log('LOGGER WORKING STARTED')
        setTimeout(() => {
            console.log('LOGGER EXITS')
        }, 5000);
    }

    asyncHandler(test())

    next(err)
}