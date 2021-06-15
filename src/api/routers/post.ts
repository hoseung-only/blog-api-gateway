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

        const response = await client.post.getPostsByCursor({ cursor });

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
    body("coverImageURL")
      .isNumeric()
      .withMessage("coverImageURL must be string")
      .optional(),
    body("content")
      .isString()
      .withMessage("content must be string")
      .exists()
      .withMessage("content must be provided"),
    body("categoryId")
      .isNumeric()
      .withMessage("categoryId must be number")
      .optional(),
    body("summary")
      .isString()
      .withMessage("summary must be string")
      .exists()
      .withMessage("summary must be provided"),
    validateParameters,
    async (req, res, next) => {
      try {
        const title = req.body.title as string;
        const coverImageURL = req.body.coverImageURL as string | undefined;
        const content = req.body.content as string;
        const categoryId = req.body.categoryId as number | undefined;
        const summary = req.body.summary as string;

        const response = await client.post.createPost({
          title,
          coverImageURL,
          content,
          categoryId,
          summary,
        });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.put(
    "/:id",
    authenticate,
    param("id").isNumeric().withMessage("categoryId must be number"),
    body("title")
      .isString()
      .withMessage("title must be string")
      .exists()
      .withMessage("title must be provided"),
    body("coverImageURL")
      .isNumeric()
      .withMessage("coverImageURL must be string")
      .optional(),
    body("content")
      .isString()
      .withMessage("content must be string")
      .exists()
      .withMessage("title must be provided"),
    body("categoryId")
      .isNumeric()
      .withMessage("categoryId must be number")
      .optional(),
    body("summary")
      .isString()
      .withMessage("summary must be string")
      .exists()
      .withMessage("summary must be provided"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = Number(req.params.id);
        const title = req.body.title as string;
        const coverImageURL = req.body.coverImageURL as string | undefined;
        const content = req.body.content as string;
        const categoryId = req.body.categoryId as number | undefined;
        const summary = req.body.summary as string;

        const response = await client.post.updatePost({
          id,
          title,
          coverImageURL,
          content,
          categoryId,
          summary
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
