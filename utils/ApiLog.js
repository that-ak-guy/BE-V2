class ApiLog {
    constructor(id, level, statusCode, code, message, reqdata, resdata, errordata = {}, systemdata = {}, userdata = {}) {
        this.id = id
        this.level = level
        this.statusCode = statusCode
        this.code = code
        this.message = message
        this.stage = process.env.STAGE || 'dev'
        this.timestamp = new Date().toLocaleString()
        this.reqdata = reqdata
        this.resdata = resdata
        this.errordata = errordata
        this.systemdata = systemdata
        this.userdata = userdata
        this.success = statusCode < 300
    }
}

export { ApiLog }