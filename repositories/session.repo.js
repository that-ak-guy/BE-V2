import { DeleteItemCommand, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import DBClient from "../config/initDB.js"

const Client = DBClient;

export const FindSessionByToken = async (token) => {
    const responseData = { status: null, data: null }
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
            responseData.status = 404
            return responseData
        }

        responseData.status = 200
        responseData.data = res.Item
        return responseData

    }
    catch (error) {
        console.error("Error finding session : ", error)
        responseData.status = 500
        return responseData
    }
}

export const CreateSessionByToken = async (sessionData) => {
    const responseData = { status: null }

    const query = {
        "Item": {
            "token": { "S": sessionData.token },
            "ext": { "S": sessionData.ext },
        },
        "TableName": process.env.SESSION_TABLE
    }

    const command = new PutItemCommand(query)

    try {
        const res = await Client.send(command)
        responseData.status = 200
        return responseData
    }
    catch (error) {
        console.error('Error : ', error)
        responseData.status = 400
        return responseData
    }
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