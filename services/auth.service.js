import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import { FindHashByUuid, FindUserByEmail, FindUserByUserID } from "../repositories/auth.repo.js"
import { VerifyPassword } from "../utils/HashUtil.js"

export const LoginService = async (loginData) => {
    const responseData = { state: false, data: null, error: null }

    const { id, userid, password } = loginData

    if (id === 'email') {
        const userData = await FindUserByEmail(userid)
        if (!userData.state) {
            responseData.error = userData.error
        }
        else {
            const uuid = userData.data.uuid
            const authData = await FindHashByUuid(uuid)
            if (!authData.state) {
                responseData.error = authData.error
            }
            else {
                const hash = authData.data.hash
                const userValid = await VerifyPassword(password, hash)
                if (!userValid.state) {
                    responseData.error = userValid.error
                }
                else {
                    responseData.state = true
                    responseData.data = userData
                }
            }
        }
    }

    return responseData
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
    const responseData = { state: false, data: null, error: null }



    return responseData
}
