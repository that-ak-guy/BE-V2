import { GetItemCommand } from "@aws-sdk/client-dynamodb"
import DBClient from "../config/initDB.js"


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

export const FindSession = async (token) => {
    const response = { state: false, user: null }

    const params = {
        Key: {
            "sessionid": {
                S: token
            }
        },
        TableName: "Session"
    }

    try {
        const data = await DBClient.send(new GetItemCommand(params))
        if (!data.Item) {
            return response
        }
        else {
            response.state = true
            response.user = data.Item.Username.S
            return response
        }
    }

    catch (error) {
        console.log(error)
    }
}