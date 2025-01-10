import { GetItemCommand } from "@aws-sdk/client-dynamodb"
import DBClient from "../config/initDB.js"
import { ApiError } from "../utils/ApiError.js"
import { ErrorCodes, ErrorMessages } from "../config/codes.js"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"


export const FindUserByUserID = async (req) => {
    const { id, userid, password } = req
    const response = { state: false, data: null }

    const params = {
        Key: {
            [id]: {
                S: userid
            }
        },
        TableName: "Auth"
    }

    try {
        const userData = await DBClient.send(new GetItemCommand(params))
        if (!userData.Item) {
            response.state = false
            response.data = null
        }

        else {
            response.state = true
            response.data = userData.Item
        }

        return response

    }
    catch (error) {
        console.log(error)
    }

}

export const FindUserByEmail = async (email) => {
    const responseData = { state: false, data: null, error: null }

    const query = {
        TableName: "Auth",
        FilterExpression: "email = :email",
    }

    const command = new GetItemCommand(query)

    try {
        const result = await DBClient.send(command)
        if (!result.Item) {
            responseData.error = new ApiError(404, ErrorCodes.Usernotfound, ErrorCodes.Usernotfound)
        }
        else {
            responseData.state = true
            responseData.data = unmarshall(result.Item)
        }
    }

    catch (error) {
        throw new ApiError(500, ErrorCodes.Internalerror, ErrorCodes.Internalerror)
    }

    return responseData
}

export const FindHashByUuid = async (uuid) => {
    const responseData = { state: false, data: null, error: null }

    const query = marshall({
        TableName: process.env.AUTHS_TABLE,
        Key: {
            uuid: uuid
        }
    })

    const command = new GetItemCommand(query)

    try {
        const result = await DBClient.send(command)
        if (!result.Item) {
            responseData.error = new ApiError(404, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        }
        else {
            responseData.state = true
            responseData.data = unmarshall(result.Item)
        }
    }
    catch (error) {
        throw new ApiError(500, ErrorCodes.Internalerror, ErrorCodes.Internalerror)
    }

    return responseData
}