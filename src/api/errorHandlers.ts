import { Router, RequestHandler, ErrorRequestHandler } from "express";

import { ResponseError } from "@hoseung-only/blog-microservice-sdk";

import { ErrorResponse } from "../utils/error";

export function applyErrorHandlers(rootRouter: Router) {
  const notFound: RequestHandler = (req, res, next) => {
    const err = new ErrorResponse(404, "Not Found");
    return next(err);
  };

  const serverError: ErrorRequestHandler = (err, req, res, next) => {
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
  };

  rootRouter.use(notFound);
  rootRouter.use(serverError);
}
