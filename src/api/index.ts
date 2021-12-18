import { Switch, OpenAPIRoute } from "typed-express";

import { PostRouter } from "./routers/post";
import { CategoryRouter } from "./routers/category";
import { SearchRouter } from "./routers/search";
import { SessionRouter } from "./routers/session";
import { ImageRouter } from "./routers/image";
import { notFound, errorHandler } from "./errorHandlers";

import * as Entities from "./entities";

const AllRouter = new Switch("/", [
  PostRouter,
  CategoryRouter,
  SearchRouter,
  SessionRouter,
  ImageRouter,
  notFound,
  errorHandler,
]);

const OpenAPI = new OpenAPIRoute(
  "/openapi",
  {
    title: "hoseungJangBlogAPI",
    version: "1.0.0",
  },
  AllRouter,
  Entities
);

export const RootRouter = new Switch("/", [OpenAPI, AllRouter]);
