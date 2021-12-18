import { Switch, Route, Parameter, Schema } from "typed-express";

import { client } from "@hoseung-only/blog-microservice-sdk";

import * as Entities from "../entities";

import { authenticate } from "../middlewares/authenticate";

export const ImageRouter = new Switch("/images", [
  Route.GET(
    "/presigned_post",
    "getPresignedPost",
    {
      fileName: Parameter.Query(Schema.String()),
      fileType: Parameter.Query(Schema.String()),
    },
    Entities.PresignedPostShow,
    async (req, res) => {
      const { fileName, fileType } = req.query;
      const response = await client.media.getPresignedPost({ fileName, fileType });
      return res.status(response.statusCode).json(response.body);
    },
    { middlewares: [authenticate] }
  ),
]);
