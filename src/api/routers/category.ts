import { Router } from "express";
import { body, param, query } from "express-validator";

import { client } from "@hoseung-only/blog-microservice-sdk";

import { authenticate } from "../middlewares/authenticate";
import { validateParameters } from "../middlewares/validateParameters";

export function applyCategoryRouters(rootRouter: Router) {
  const router = Router();

  router.post(
    "/",
    authenticate,
    body("name").isString().withMessage("name must be string").exists().withMessage("name must be provided"),
    body("parentId").isString().withMessage("parentId must be string").optional(),
    validateParameters,
    async (req, res, next) => {
      try {
        const name = req.body.name as string;
        const parentId = req.body.parentId as string | undefined;

        const response = await client.post.createCategory({ name, parentId });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get("/", async (req, res, next) => {
    try {
      const response = await client.post.getAllCategories();

      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      return next(error);
    }
  });

  router.put(
    "/:id",
    authenticate,
    param("id").isString().withMessage("id must be string"),
    body("name").isString().withMessage("name must be string").exists().withMessage("name must be provided"),
    body("parentId").isString().withMessage("parentId must be string").optional(),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = req.params.id as string;
        const name = req.body.name as string;
        const parentId = req.body.parentId as string | undefined;

        const response = await client.post.updateCategory({
          id,
          name,
          parentId,
        });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get(
    "/:id/posts",
    param("id").isString().withMessage("id must be string"),
    query("count").isNumeric().withMessage("count must be number").exists().withMessage("count must be provided"),
    query("cursor").isNumeric().withMessage("cursor must be string").optional(),
    validateParameters,
    async (req, res, next) => {
      try {
        const categoryId = req.params.id as string;
        const count = Number(req.query.count);
        const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

        const response = await client.post.getCategoryPostsByCursor({
          categoryId,
          count,
          cursor,
        });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.delete(
    "/:id",
    authenticate,
    param("id").isString().withMessage("id must be string"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = req.params.id as string;

        const response = await client.post.deleteCategoryById({ id });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/categories", router);
}
