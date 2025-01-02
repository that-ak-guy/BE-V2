export const SessionVerify = async (req, res, next) => {
    const sessionid = req.cookies.sessionid
    console.log(sessionid)
    if (!sessionid) {
        req.authstate = false
    }

    else {
        req.authstate = true
    }

    next()
}