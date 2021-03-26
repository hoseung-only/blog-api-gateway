import { Router } from "express";
import { body, param } from "express-validator";

import { client } from "@hoseung-only/blog-microservice-sdk";

import { authenticate } from "../middlewares/authenticate";
import { validateParameters } from "../middlewares/validateParameters";

export const applyCategoryRouters = (rootRouter: Router) => {
  const router = Router();

  router.post(
    "/",
    authenticate,
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

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get("/", async (req, res, next) => {
    try {
      const response = await client.post.getAllCategory();

      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      return next(error);
    }
  });

  router.delete(
    "/:id",
    authenticate,
    param("id")
      .isNumeric()
      .withMessage("ids must be number"),
    validateParameters,
    async (req, res, next) => {
      try {
        const id = Number(req.params.id);

        const response = await client.post.deleteCategoryById({ id });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/categories", router);
};
