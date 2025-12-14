const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customeError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };
  if (err.name === "CastError") {
    customeError.message = `No item fount with id : ${err.value}`;
    customeError.statusCode = 404;
  }

  if (err.name === "ValidationError") {
    customeError.message = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    customeError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customeError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field , please chooose another value`;
    customeError.statusCode = 400;
  }
  // return res.status(customeError.statusCode).json({err});
  return res
    .status(customeError.statusCode)
    .json({ message: customeError.message });
};

module.exports = errorHandlerMiddleware;
