import { Router } from "express";
import { body } from "express-validator";

import { validateParameters } from "../middlewares/validateParameters";

import { AuthService } from "../../services/auth";

import * as Presenters from "../presenters";
import { ErrorResponse } from "../../utils/error";

export function applySessionRouters(rootRouter: Router) {
  const router = Router();

  router.post(
    "/",
    body("email").isString().withMessage("email must be string").exists().withMessage("email must be provided"),
    body("password")
      .isString()
      .withMessage("password must be string")
      .exists()
      .withMessage("password must be provided"),
    validateParameters,
    async (req, res, next) => {
      try {
        const email = req.body.email as string;
        const password = req.body.password as string;

        const isValidAccount = AuthService.verifyAccount({ email, password });

        if (!isValidAccount) {
          throw new ErrorResponse(401, "invalid account");
        }

        const token = AuthService.createJWT();

        return res.status(201).json(Presenters.presentSession({ token }));
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/sessions", router);
}
