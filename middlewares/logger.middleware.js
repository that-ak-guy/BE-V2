import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { ApiLog } from "../utils/ApiLog.js";
import { GenerateLogID } from "../utils/LogidUtil.js";

export const ErrorLogID = async (err, req, _, next) => {
    const id = await GenerateLogID()
    if (!id.state) {
        console.log(id.error)
    }

    req.logid = id.data.id

    next(err)
}

export const ErrorLogger = async (err, req, _, next) => {

    const reqData = { ip: req.ip, path: req.path, body: req.body, method: req.method }
    const errData = { stack: err.stack }
    const sysData = {}
    const userData = req.uuid ? { uuid: req.uuid } : {}

    if (err instanceof ApiError) {
        const logData = new ApiLog(req.logid, err.level, err.statusCode, err.code, err.message, reqData, errData, sysData, userData)

        axios({
            method: 'post',
            baseURL: 'https://logger-service.vercel.app/logs',
            url: 'create',
            data: logData
        })
            .then((data) => {
                console.log(data.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    next(err)
}