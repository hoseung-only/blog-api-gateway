import * as express from "express";

import { applyAllRouters } from "./api";

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    applyAllRouters(this.app);
  }

  public getApplication() {
    return this.app;
  }
}

export const app = new App().getApplication();
