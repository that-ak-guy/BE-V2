import { GetItemCommand, QueryCommand, TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb"
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
        TableName: process.env.USERS_TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :emailValue",
        ExpressionAttributeValues: {
            ":emailValue": marshall(email)
        }
    }

    const command = new QueryCommand(query)

    try {
        const result = await DBClient.send(command)
        if (result.Items.length === 0) {
            responseData.error = new ApiError(404, ErrorCodes.Usernotfound, ErrorCodes.Usernotfound)
        }
        else {
            responseData.state = true
            responseData.data = unmarshall(result.Items[0])
        }
    }

    catch (error) {
        throw new ApiError(500, ErrorCodes.Internalerror, ErrorCodes.Internalerror, [], error.stack)
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

export const CreateUserByUserID = async (userData) => {
    const responseData = { state: false, data: {}, error: null }
    const { uuid, email, createdAt, changedAt, hash } = userData

    const query = {
        TransactItems: [
            {
                Put: {
                    Item: marshall({
                        uuid: uuid,
                        email: email,
                        createdAt: createdAt
                    }),
                    TableName: process.env.USERS_TABLE
                },
            },
            {
                Put: {
                    Item: marshall({
                        uuid: uuid,
                        hash: hash,
                        changedAt: changedAt
                    }),
                    TableName: process.env.AUTHS_TABLE
                },
            },
        ],
        ReturnConsumedCapacity: "TOTAL",
        ReturnItemCollectionMetrics: "SIZE",
    }

    const command = new TransactWriteItemsCommand(query)

    try {
        const dbData = await DBClient.send(command)
        responseData.state = true
    }
    catch (error) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}