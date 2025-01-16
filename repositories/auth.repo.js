import { QueryCommand, TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb"
import DBClient from "../config/initDB.js"
import { ApiError } from "../utils/ApiError.js"
import { ErrorCodes, ErrorMessages } from "../config/codes.js"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"
import { InternalResponse } from "../utils/InternalDataUtil.js"


export const FindUserByUuid = async (uuid) => {
    const responseData = new InternalResponse()

    if (!uuid) {
        console.log("No uuid")
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        return responseData
    }

    const query = {
        TableName: process.env.USERS_TABLE,
        ExpressionAttributeNames: {
            "#uuid": "uuid"
        },
        ExpressionAttributeValues: {
            ":uuidValue": marshall(uuid)
        },
        KeyConditionExpression: "#uuid = :uuidValue"
    }

    const command = new QueryCommand(query)

    try {
        const dbData = await DBClient.send(command)
        if (dbData.Items.length === 0) {
            responseData.error = new ApiError(404, ErrorCodes.Usernotfound, ErrorMessages.Usernotfound)
            return responseData
        }

        responseData.state = true
        responseData.data = { userData: unmarshall(dbData.Items[0]) }
    }

    catch (error) {
        console.log('Uuid : ' + error)
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }
    return responseData
}


export const FindUserByEmail = async (email) => {
    const responseData = new InternalResponse()

    if (!email) {
        console.log("No email")
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorCodes.Internalerror)
        return responseData
    }

    const query = {
        TableName: process.env.USERS_TABLE,
        IndexName: "email-index",
        ExpressionAttributeNames: {
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":emailValue": marshall(email)
        },
        KeyConditionExpression: "#email = :emailValue",
    }

    const command = new QueryCommand(query)

    try {
        const dbData = await DBClient.send(command)
        if (dbData.Items.length === 0) {
            responseData.error = new ApiError(404, ErrorCodes.Usernotfound, ErrorCodes.Usernotfound)
            return responseData
        }

        responseData.state = true
        responseData.data = unmarshall(dbData.Items[0])
    }

    catch (error) {
        console.log('Email : ' + error)
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorCodes.Internalerror)
    }
    return responseData
}


export const FindHashByUuid = async (uuid) => {
    const responseData = new InternalResponse()

    if (!uuid) {
        console.log('No uuid')
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        return responseData
    }


    const query = {
        TableName: process.env.AUTHS_TABLE,
        ExpressionAttributeNames: {
            "#uuid": "uuid"
        },
        ExpressionAttributeValues: {
            ":uuidValue": marshall(uuid)
        },
        KeyConditionExpression: "#uuid = :uuidValue"
    }

    const command = new QueryCommand(query)

    try {
        const result = await DBClient.send(command)
        if (result.Items.length === 0) {
            console.log('PASSWORD NOT FOUND')
            responseData.error = new ApiError(404, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
            return responseData
        }

        responseData.state = true
        responseData.data = unmarshall(result.Items[0])

    }
    catch (error) {
        console.log(error)
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorCodes.Internalerror)
    }
    return responseData
}

export const CreateUserByUserID = async (data) => {
    const responseData = new InternalResponse()

    if (!data) {
        console.log('No userdata')
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
        return responseData
    }


    const { uuid, name, email, createdAt, changedAt, hash } = data

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

        console.log(dbData.ItemCollectionMetrics)
    }
    catch (error) {
        responseData.error = new ApiError(500, ErrorCodes.Internalerror, ErrorMessages.Internalerror)
    }

    return responseData
}

