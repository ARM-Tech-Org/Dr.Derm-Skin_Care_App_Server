const globalErrorHandler = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.statusMessage = error.statusMessage || 'Internal Server Error';
    res.status(error.statusCode).json({
        success: false,
        message: error.statusMessage
    });
}

module.exposts = globalErrorHandler;