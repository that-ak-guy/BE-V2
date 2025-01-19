class ApiLog {
    constructor(logid, level, statusCode, code, message, reqData, errorData, systemData = null, userData = null) {
        this.logid = logid
        this.level = level
        this.statusCode = statusCode
        this.code = code
        this.message = message
        this.stage = process.env.STAGE || 'dev'
        this.timestamp = new Date().toLocaleString()
        this.reqData = reqData
        this.errorData = errorData
        this.systemData = systemData
        this.userData = userData
    }
}

export { ApiLog }