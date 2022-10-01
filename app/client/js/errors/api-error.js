class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.message = message;
    }
}

export default ApiError;