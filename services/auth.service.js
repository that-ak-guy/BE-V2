import { FindUserByUserID } from "../repositories/auth.repo.js"

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
