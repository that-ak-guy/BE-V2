import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import { FindUserByEmail, FindUserByUserID } from "../repositories/auth.repo.js"

export const LoginService = async (req) => {
    const userData = { status: false, msg: "", data: null }
    const data = await FindUserByUserID(req.body)
    console.log(data)

    if (data.state === false) {
        userData.msg = "Login Unsuccessful"
    }

    else {
        userData.status = true
        userData.msg = "Login Successful"
        userData.data = data.data
    }

    return userData
}

export const UniqueEmailService = async (email) => {
    try {
        const data = await FindUserByEmail(email)
    }
    catch (error) {
        console.log(error)
    }
}

export const RegisterService = async (data) => {
    const responseData = { status: null, data: null }
    const { name, email, phone, password } = data

    const query = {
        "TableName": process.env.USERS_TABLE,
        "Item": {
            "name": {
                "S": name
            },
            "email": {
                "S": email
            },
            "phone": {
                "S": phone
            },
        }
    }

    const command = new PutItemCommand()

}
