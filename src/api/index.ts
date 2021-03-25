import { Router } from "express";

import { applyOpenAPIRouter } from "./openAPI";
import { applyPostRouters } from "./routers/post";
import { applyCategoryRouters } from "./routers/category";
import { applySessionRouters } from "./routers/session";
import { applyErrorHandlers } from "./errorHandlers";

export const getRootRouter = () => {
  const router = Router();

  applyOpenAPIRouter(router);
  applyPostRouters(router);
  applyCategoryRouters(router);
  applySessionRouters(router);
  applyErrorHandlers(router);

  return router;
};
