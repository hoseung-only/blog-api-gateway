import { Switch, Route, Parameter, Schema, ErrorResponse } from "typed-express";

import * as Entities from "../entities";
import * as Presenters from "../presenters";

import { AuthService } from "../../services/auth";

export const SessionRouter = new Switch("/sessions", [
  Route.POST(
    "/",
    "createSession",
    { email: Parameter.Body(Schema.String()), password: Parameter.Body(Schema.String()) },
    Entities.SessionShow,
    async (req, res) => {
      const { email, password } = req.body;
      const isValidAccount = AuthService.verifyAccount({ email, password });
      if (!isValidAccount) {
        throw new ErrorResponse(401, "invalid account");
      }
      const token = AuthService.createJWT();
      return res.status(201).json(Presenters.presentSession({ token }));
    }
  ),
]);
