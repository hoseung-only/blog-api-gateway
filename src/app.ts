import * as express from "express";

import { applyAllRouters } from "./api";

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.use((req, res, next) => {
      if (req.headers.origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
      }
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        ["Content-Type", "x-blog-auth-token"].join(", ")
      );
      next();
    });

    applyAllRouters(this.app);
  }

  public getApplication() {
    return this.app;
  }
}

export const app = new App().getApplication();
