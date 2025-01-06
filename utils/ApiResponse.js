class ApiResponse {
    constructor(statusCode, code, message = "Success", data = null) {
        this.statusCode = statusCode
        this.code = code
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }