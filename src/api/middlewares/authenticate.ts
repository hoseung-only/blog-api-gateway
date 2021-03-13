import { RequestHandler } from "express";

import { AuthService } from "../../services/auth";

import { ErrorResponse } from "../../utils/error";

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.headers["x-blog-auth-token"];

  if (!token || !AuthService.verifyJWT(token as string)) {
    const error = new ErrorResponse(401, "Unauthorized");

    return next(error);
  }

  return next();
};
