import ApiError from "../utils/api-error.js";

const errorHandler = (err, req, res, next) => {

    // Handle known (custom) errors
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Handle unknown errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

export default errorHandler;
