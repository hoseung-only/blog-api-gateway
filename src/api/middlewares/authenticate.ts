import { Middleware, ErrorResponse } from "typed-express";

import { AuthService } from "../../services/auth";

export const authenticate = new Middleware((req, res, next) => {
  const token = req.headers["x-blog-auth-token"];

  if (!token || !AuthService.verifyJWT(token as string)) {
    const error = new ErrorResponse(401, "Unauthorized");

    return next(error);
  }

  return next();
});
