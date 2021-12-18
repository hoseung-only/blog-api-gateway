import { Middleware, ErrorHandler, ErrorResponse } from "typed-express";

import { ResponseError } from "@hoseung-only/blog-microservice-sdk";

export const notFound = new Middleware((req, res, next) => {
  const err = new ErrorResponse(404, "Not Found");
  return next(err);
});

export const errorHandler = new ErrorHandler((err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  } else if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
