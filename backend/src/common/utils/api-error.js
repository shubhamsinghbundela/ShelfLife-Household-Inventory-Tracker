class ApiError extends Error {
    // Inherit from built-in JavaScript Error
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode;

        // Capture clean stack trace
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(400, message);
    }

    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }

    static notFound(message = "Not Found") {
        return new ApiError(404, message);
    }
}

export default ApiError;
