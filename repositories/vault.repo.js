import { QueryCommand } from "@aws-sdk/client-dynamodb"
import DBClient from "../config/initDB.js"

export const GetPasswordsByQuery = async (queryParams) => {
    const Client = DBClient
    const { category, sort, page, limit } = queryParams

    const query = {
        ExpressionAttributeValues: {
            ':id': {
                'S': 'kainez07'
            },
            ':cat': {
                'S': 'category1'
            }
        },
        TableName: "Vault",
        KeyConditionExpression: 'userid = :id',
        FilterExpression: 'category = :cat'

    }

    const command = new QueryCommand(query)
    try {
        const res = await Client.send(command)
        console.log(res.Items)
    }
    catch (error) {
        console.log(error)
    }
}