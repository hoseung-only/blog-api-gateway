import { Router } from "express";
import { body } from "express-validator";

import { validateParameters } from "../middlewares/validateParameters";

import { AuthService } from "../../services/auth";

import * as Presenters from "../presenters";

export const applySessionRouters = (rootRouter: Router) => {
  const router = Router();

  router.post(
    "/",
    body("email")
      .equals(process.env.ADMIN_EMAIL!)
      .withMessage("invalid email")
      .exists()
      .withMessage("email must be provided"),
    body("password")
      .equals(process.env.ADMIN_PASSWORD!)
      .withMessage("invalid password")
      .exists()
      .withMessage("password must be provided"),
    validateParameters,
    async (req, res, next) => {
      try {
        const token = AuthService.createJWT();

        return res.status(201).json(Presenters.presentSession({ token }));
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/sessions", router);
};
