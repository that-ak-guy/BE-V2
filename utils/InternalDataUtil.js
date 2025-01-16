class InternalResponse {
    constructor(state = false, data = {}, error = null) {
        this.state = state
        this.data = data
        this.error = error
    }
}

export { InternalResponse }