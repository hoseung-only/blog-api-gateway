import { Application, Router } from "express";

import { applyOpenAPIRouter } from "./openAPI";
import { applyPostRouters } from "./routers/post";
import { applyCategoryRouters } from "./routers/category";
import { applySearchRouters } from "./routers/search";
import { applySessionRouters } from "./routers/session";
import { applyImageRouters } from "./routers/image";
import { applyStaticRouters } from "./routers/static";
import { applyErrorHandlers } from "./errorHandlers";

export function applyAllRouters(app: Application) {
  const router = Router();

  applyOpenAPIRouter(router);
  applyPostRouters(router);
  applyCategoryRouters(router);
  applySearchRouters(router);
  applySessionRouters(router);
  applyImageRouters(router);
  applyStaticRouters(router);
  applyErrorHandlers(router);

  app.use("/", router);
}
