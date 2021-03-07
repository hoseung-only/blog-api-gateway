import { Router } from "express";

import { applyHelloworldRouters } from "./routers/helloworld";
import { applyErrorHandlers } from "./errorHandlers";

export const getRootRouter = () => {
  const router = Router();

  applyHelloworldRouters(router);
  applyErrorHandlers(router);

  return router;
};
