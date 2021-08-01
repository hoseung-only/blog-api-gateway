import { Router } from "express";
import { query } from "express-validator";

import { client } from "@hoseung-only/blog-microservice-sdk";

import { authenticate } from "../middlewares/authenticate";
import { validateParameters } from "../middlewares/validateParameters";

export const applyImageRouters = (rootRouter: Router) => {
  const router = Router();

  router.get(
    "/presigned_post",
    authenticate,
    query("fileName").isString().exists(),
    query("fileType").isString().exists(),
    validateParameters,
    async (req, res, next) => {
      try {
        const fileName = req.query.fileName as string;
        const fileType = req.query.fileType as string;

        const response = await client.media.getPresignedPost({ fileName, fileType });

        return res.status(response.statusCode).json(response.body);
      } catch (error) {
        return next(error);
      }
    }
  );

  rootRouter.use("/images", router);
};
