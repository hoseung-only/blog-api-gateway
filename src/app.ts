import { express, Application } from "typed-express";

import { RootRouter } from "./api";

export const app = new Application(RootRouter, (app) => {
  app.set("trust proxy", true);
  app.use(express.json());
  app.use((req, res, next) => {
    if (req.headers.origin) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", ["Content-Type", "x-blog-auth-token"].join(", "));
    next();
  });
}).get();
