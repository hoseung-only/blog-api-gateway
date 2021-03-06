import { Router } from "express";
import { query, param, body } from "express-validator";

import { client } from "@hoseung-only/blog-microservice-sdk";

import { authenticate } from "../middlewares/authenticate";
import { validateParameters } from "../middlewares/validateParameters";

export function applyPostRouters(rootRouter: Router) {
  const router = Router();

  router.get(
    "/",
    query("count").isNumeric().withMessage("count must be number").exists().withMessage("count must be provided"),
    query("cursor").isNumeric().withMessage("cursor must be number").optional(),
    validateParameters,
    async (req, res, next) => {
      try {
        const count = Number(req.query.count);
        const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

        const response = await client.post.getPostsByCursor({ count, cursor });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get(
    "/:id",
    param("id").isString().withMessage("id must be string"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = req.params.id as string;

        const response = await client.post.getPost({ id });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.patch(
    "/:id/view_count",
    param("id").isString().withMessage("id must be string"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = req.params.id as string;
        const forwarded = req.headers["x-forwarded-for"] as string;

        const response = await client.post.increaseViewCount({ id, forwarded });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.post(
    "/",
    authenticate,
    body("title").isString().withMessage("title must be string").exists().withMessage("title must be provided"),
    body("coverImageURL")
      .isString()
      .withMessage("coverImageURL must be string")
      .exists()
      .withMessage("coverImageURL must be provided"),
    body("content").isString().withMessage("content must be string").exists().withMessage("content must be provided"),
    body("categoryId").isString().withMessage("categoryId must be string").optional(),
    body("summary").isString().withMessage("summary must be string").exists().withMessage("summary must be provided"),
    validateParameters,
    async (req, res, next) => {
      try {
        const title = req.body.title as string;
        const coverImageURL = req.body.coverImageURL as string;
        const content = req.body.content as string;
        const categoryId = req.body.categoryId as string | undefined;
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
    param("id").isString().withMessage("categoryId must be string"),
    body("title").isString().withMessage("title must be string").exists().withMessage("title must be provided"),
    body("coverImageURL")
      .isString()
      .withMessage("coverImageURL must be string")
      .exists()
      .withMessage("coverImageURL must be provided"),
    body("content").isString().withMessage("content must be string").exists().withMessage("title must be provided"),
    body("categoryId").isString().withMessage("categoryId must be string").optional(),
    body("summary").isString().withMessage("summary must be string").exists().withMessage("summary must be provided"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = req.params.id as string;
        const title = req.body.title as string;
        const coverImageURL = req.body.coverImageURL as string;
        const content = req.body.content as string;
        const categoryId = req.body.categoryId as string | undefined;
        const summary = req.body.summary as string;

        const response = await client.post.updatePost({
          id,
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

  router.delete(
    "/:id",
    authenticate,
    param("id").isString().withMessage("id must be string"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = req.params.id as string;

        const response = await client.post.deletePostById({ id });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/posts", router);
}
