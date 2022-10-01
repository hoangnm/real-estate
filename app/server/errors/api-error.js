class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'ApiError';
        this.error_code = code;
        this.error_message = message;
    }

    static handleError(error) {
        var parentCode = error.parent && error.parent.code;
        const serializedError = new ApiError();
        if (error.name === 'SequelizeDatabaseError') {
            if (parentCode === 'ER_PARSE_ERROR' || parentCode === 'ER_BAD_FIELD_ERROR') {
                serializedError.error_message = 'Query string wrong';
                serializedError.error_code = 'ER_QUERY';
            }
        }
        return serializedError;
    }
}

module.exports = ApiError;