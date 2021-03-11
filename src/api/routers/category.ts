import { Router } from "express";
import { body } from "express-validator";

import { client } from "@hoseung-only/blog-microservice-sdk";

import { validateParameters } from "../middlewares/validateParameters";

export const applyCategoryRouters = (rootRouter: Router) => {
  const router = Router();

  router.post(
    "/",
    body("name")
      .isString()
      .withMessage("name must be string")
      .exists()
      .withMessage("name must be provided"),
    body("parentId")
      .isNumeric()
      .withMessage("parentId must be string")
      .optional(),
    validateParameters,
    async (req, res, next) => {
      try {
        const name = req.body.name as string;
        const parentId = (req.body.parentId as number) || undefined;

        const response = await client.post.createCategory({ name, parentId });

        return res.status(201).json(response);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get("/", async (req, res, next) => {
    try {
      const response = await client.post.getAllCategory();

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  });

  router.delete(
    "/",
    body("ids")
      .isArray()
      .withMessage("ids must be number array")
      .isLength({ min: 1 })
      .withMessage("ids must have at least 1 element"),
    validateParameters,
    async (req, res, next) => {
      try {
        const ids = req.body.ids as number[];

        const response = await client.post.deleteCategoriesByIds({ ids });

        return res.status(200).json(response);
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/categories", router);
};
