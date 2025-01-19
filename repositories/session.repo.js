import { DeleteItemCommand, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import DBClient from "../config/initDB.js"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ApiError } from "../utils/ApiError.js";
import { ErrorCodes, ErrorMessages } from "../config/codes.js";
import { InternalResponse } from "../utils/InternalDataUtil.js";


export const FindSessionByToken = async (token) => {
    const responseData = new InternalResponse()

    if (!token) {
        console.log('No token found.')
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        return responseData
    }

    const query = {
        Key: {
            token: marshall(token),
        },
        TableName: process.env.SESSION_TABLE
    }

    const command = new GetItemCommand(query)
    try {
        const dbData = await DBClient.send(command)
        if (!dbData.Item) {
            responseData.error = new ApiError(401, ErrorCodes.Invalidtoken, ErrorMessages.Invalidtoken, 'WARNING')
            return responseData
        }

        responseData.state = true
        responseData.data = unmarshall(dbData.Item)

    }
    catch (error) {
        console.log('Error Finding Session :' + error)
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }
    return responseData
}

export const CreateSessionByToken = async (sessionData) => {
    const responseData = new InternalResponse()

    const { uuid, token, ext } = sessionData

    const query = {
        Item: marshall({
            uuid: uuid,
            token: token,
            ext: ext,
        }),
        TableName: process.env.SESSION_TABLE
    }

    const command = new PutItemCommand(query)

    try {
        const dbData = await DBClient.send(command)
        responseData.state = true
    }
    catch (error) {
        console.log('Error creating session : ' + error)
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}

export const DeleteRefreshToken = async (token) => {
    const responseData = new InternalResponse()

    if (!token) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        return responseData
    }

    const query = {
        TableName: process.env.SESSION_TABLE,
        Key: {
            "token": marshall(token)
        }
    }

    const command = new DeleteItemCommand(query)

    try {
        const dbData = await DBClient.send(command)
        console.log(dbData)
        responseData.state = true
    }
    catch (error) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror, undefined, undefined, error.stack)
    }

    return responseData
}
