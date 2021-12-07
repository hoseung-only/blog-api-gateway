import { Router } from "express";
import { query, param, body } from "express-validator";

import { client } from "@hoseung-only/blog-microservice-sdk";

import { validateParameters } from "../middlewares/validateParameters";

export function applySearchRouters(rootRouter: Router) {
  const router = Router();

  router.get(
    "/",
    query("query").exists().withMessage("query must be provided"),
    query("count").isNumeric().withMessage("count must be number").exists().withMessage("count must be provided"),
    query("cursor").isNumeric().withMessage("cursor must be number").optional(),
    validateParameters,
    async (req, res, next) => {
      try {
        const query = decodeURIComponent(req.query.query as string);
        const count = Number(req.query.count);
        const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

        const response = await client.post.searchPost({ query, count, cursor });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/search", router);
}
