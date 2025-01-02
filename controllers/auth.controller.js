import { FindSession } from "../repositories/auth.repo.js"
import { LoginService } from "../services/auth.service.js"
import { GenerateToken } from "../utils/token.util.js"


export const LoginController = async (req, res) => {
    if (req.authstate === true) {
        const sessionid = req.cookies.sessionid
        const authdata = await FindSession(sessionid)
        if (authdata.state === false) {
            res.send({ msg: "Invalid Session" })
        }

        else {
            res.send({ msg: "User already signed in", userid: authdata.user })
        }

    }

    else {
        const userData = await LoginService(req)
        if (userData.status === false) {
            
        }

        else {
            const sessionid = GenerateToken()
            res.cookie("sessionid", sessionid, {
                httpOnly: false,
                secure: true,
                sameSite: 'None',
                expires: new Date(Date.now() + 36000000)
            })
        }

        res.send(userData)
    }


}

export const SignUpController = (req, res) => {

}

export const LogoutContoller = (req, res) => {

}
