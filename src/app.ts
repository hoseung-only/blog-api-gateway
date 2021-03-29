import * as express from "express";

import { applyAllRouters } from "./api";

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    applyAllRouters(this.app);
  }

  public getApplication() {
    return this.app;
  }
}

export const app = new App().getApplication();
