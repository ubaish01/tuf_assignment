const errorHandlers = {

    errorHandler: (
        res,
        statusCode = 500,
        message = "Internal Server Error"
    ) => {
        return res.status(statusCode).json({
            success: false,
            message,
        });
    },
    asyncError: (passedFunc) => (req, res) => {
        return Promise.resolve(passedFunc(req, res)).catch((err) => {
            console.log("err");
            return res.status(500).json({
                success: false,
                message:err.message,
            });
        });
    }
}

module.exports = errorHandlers 