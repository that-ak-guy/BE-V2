import { DeleteItemCommand, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import DBClient from "../config/initDB.js"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ApiError } from "../utils/ApiError.js";
import { ErrorCodes, ErrorMessages } from "../config/codes.js";

const Client = DBClient;

export const FindSessionByToken = async (token) => {
    const responseData = { state: false, data: null, error: null }

    const query = {
        "Key": {
            "token": {
                "S": token
            },
        },
        "TableName": process.env.SESSION_TABLE
    }

    const command = new GetItemCommand(query)
    try {
        const res = await Client.send(command)
        if (!res.Item) {
            responseData.error = new ApiError(401, ErrorCodes.Invalidtoken, ErrorMessages.Invalidtoken)
        }
        else {
            responseData.state = true
            responseData.data = unmarshall(res.Item)
        }
    }
    catch (error) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }
    return responseData
}

export const CreateSessionByToken = async (sessionData) => {
    const responseData = { state: false, data: null, error: null }
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
        const result = await Client.send(command)
        responseData.state = true
    }
    catch (error) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}

export const ClearSessionByToken = async (token) => {
    const responseData = { status: null }

    const query = {
        "Key": {
            "token": {
                "S": token
            }
        },
        "TableName": process.env.SESSION_TABLE
    }

    const command = new DeleteItemCommand(query)

    try {
        const res = await Client.send(command)
        console.log(res)
    }
    catch (error) {
        console.error('Error Clearing Session : ', error)
    }
}
