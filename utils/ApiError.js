class ApiError extends Error {
    constructor(
        statusCode,
        code,
        message = "Something went wrong.",
        level = 'CRTITICAL',
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.code = code
        this.data = null
        this.message = message
        this.level = level
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }

    }

}

export { ApiError }