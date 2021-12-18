import { Switch, Route, Parameter, Schema } from "typed-express";

import { client } from "@hoseung-only/blog-microservice-sdk";

import * as Entities from "../entities";

import { authenticate } from "../middlewares/authenticate";

export const PostRouter = new Switch("/posts", [
  Route.GET(
    "/",
    "getPostsByCursor",
    { count: Parameter.Query(Schema.Number()), cursor: Parameter.Query(Schema.Optional(Schema.Number())) },
    Entities.PostListShow,
    async (req, res) => {
      const { count, cursor = 0 } = req.query;
      const response = await client.post.getPostsByCursor({ count, cursor });
      return res.status(response.statusCode).json(response.body);
    }
  ),

  Route.GET("/{id}", "getPost", { id: Parameter.Path(Schema.String()) }, Entities.Post, async (req, res) => {
    const { id } = req.params;
    const response = await client.post.getPost({ id });

    return res.status(response.statusCode).json(response.body);
  }),

  Route.PATCH(
    "/",
    "increaseViewCount",
    { id: Parameter.Path(Schema.String()), userId: Parameter.Query(Schema.String()) },
    Entities.SuccessShow,
    async (req, res) => {
      const { id } = req.params;
      const { userId } = req.query;
      const response = await client.post.increaseViewCount({ id, userId });
      return res.status(response.statusCode).json(response.body);
    }
  ),

  Route.POST(
    "/",
    "createPost",
    {
      title: Parameter.Body(Schema.String()),
      summary: Parameter.Body(Schema.String()),
      coverImageURL: Parameter.Body(Schema.String()),
      content: Parameter.Body(Schema.String()),
      categoryId: Parameter.Body(Schema.Optional(Schema.String())),
    },
    Entities.Post,
    async (req, res) => {
      const { title, summary, coverImageURL, content, categoryId } = req.body;
      const response = await client.post.createPost({
        title,
        coverImageURL,
        content,
        categoryId,
        summary,
      });
      return res.status(response.statusCode).json(response.body);
    },
    { middlewares: [authenticate] }
  ),

  Route.PUT(
    "/{id}",
    "updatePost",
    {
      id: Parameter.Path(Schema.String()),
      title: Parameter.Body(Schema.String()),
      summary: Parameter.Body(Schema.String()),
      coverImageURL: Parameter.Body(Schema.String()),
      content: Parameter.Body(Schema.String()),
      categoryId: Parameter.Body(Schema.Optional(Schema.String())),
    },
    Entities.Post,
    async (req, res) => {
      const { id } = req.params;
      const { title, summary, coverImageURL, content, categoryId } = req.body;
      const response = await client.post.updatePost({
        id,
        title,
        coverImageURL,
        content,
        categoryId,
        summary,
      });
      return res.status(response.statusCode).json(response.body);
    },
    { middlewares: [authenticate] }
  ),

  Route.DELETE(
    "/{id}",
    "deletePost",
    { id: Parameter.Path(Schema.String()) },
    Entities.SuccessShow,
    async (req, res) => {
      const { id } = req.params;
      const response = await client.post.deletePostById({ id });
      return res.status(response.statusCode).json(response.body);
    },
    { middlewares: [authenticate] }
  ),
]);
