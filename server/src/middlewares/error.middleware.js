const errorMiddleware = (err, req, res, next) => {
  let message = err.message || "someting went wrong";
  let statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack,
  });
};

export default errorMiddleware;
