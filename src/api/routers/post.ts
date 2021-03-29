import { Router } from "express";
import { query, param, body } from "express-validator";

import { client } from "@hoseung-only/blog-microservice-sdk";

import { authenticate } from "../middlewares/authenticate";
import { validateParameters } from "../middlewares/validateParameters";

export function applyPostRouters(rootRouter: Router) {
  const router = Router();

  router.get(
    "/",
    query("cursor").isNumeric().withMessage("cursor must be number").optional(),
    validateParameters,
    async (req, res, next) => {
      try {
        const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

        const response = await client.post.getPostList({ cursor });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get(
    "/:id",
    param("id").isNumeric().withMessage("id must be number"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = Number(req.params.id);

        const response = await client.post.getPost({ id });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.post(
    "/",
    authenticate,
    body("title")
      .isString()
      .withMessage("title must be string")
      .exists()
      .withMessage("title must be provided"),
    body("content")
      .isString()
      .withMessage("content must be string")
      .exists()
      .withMessage("title must be provided"),
    body("categoryId")
      .isNumeric()
      .withMessage("categoryId must be number")
      .exists()
      .withMessage("categoryId must be provided"),
    validateParameters,
    async (req, res, next) => {
      try {
        const title = req.body.title as string;
        const content = req.body.content as string;
        const categoryId = Number(req.body.categoryId);

        const response = await client.post.createPost({
          title,
          content,
          categoryId,
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
    param("id").isNumeric().withMessage("id must be number"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = Number(req.params.id);

        const response = await client.post.deletePostById({ id });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/posts", router);
}
