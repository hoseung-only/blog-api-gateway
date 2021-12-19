import { Switch, Route, Parameter, Schema } from "typed-express";

import { client } from "@hoseung-only/blog-microservice-sdk";

import * as Entities from "../entities";

import { authenticate } from "../middlewares/authenticate";

export const CategoryRouter = new Switch("/categories", [
  Route.POST(
    "/",
    "createCategory",
    {
      name: Parameter.Body(Schema.String()),
      parentId: Parameter.Body(Schema.Optional(Schema.String())),
    },
    Entities.Category,
    async (req, res) => {
      const { name, parentId } = req.body;
      const response = await client.post.createCategory({ name, parentId });
      return res.status(response.statusCode).json(response.body);
    },
    { middlewares: [authenticate] }
  ),

  Route.GET("/", "getAllCategories", {}, Entities.AllCategoriesShow, async (req, res) => {
    const response = await client.post.getAllCategories();
    return res.status(response.statusCode).json(response.body);
  }),

  Route.GET(
    "/{id}",
    "getCategory",
    { id: Parameter.Path(Schema.String()) },
    Entities.Category,
    async (req, res) => {
      const { id } = req.params;
      const response = await client.post.getCategoryById({ id });
      return res.status(response.statusCode).json(response.body);
    }
  ),

  Route.PUT(
    "/{id}",
    "updateCategory",
    {
      id: Parameter.Path(Schema.String()),
      name: Parameter.Body(Schema.String()),
      parentId: Parameter.Body(Schema.Optional(Schema.String())),
    },
    Entities.Category,
    async (req, res) => {
      const { id } = req.params;
      const { name, parentId } = req.body;
      const response = await client.post.updateCategory({
        id,
        name,
        parentId,
      });
      return res.status(response.statusCode).json(response.body);
    },
    { middlewares: [authenticate] }
  ),

  Route.GET(
    "/{id}/posts",
    "getCategoryPostsByCursor",
    {
      id: Parameter.Path(Schema.String()),
      count: Parameter.Query(Schema.Number()),
      cursor: Parameter.Query(Schema.Optional(Schema.Number())),
    },
    Entities.PostListShow,
    async (req, res) => {
      const { id } = req.params;
      const { count, cursor = 0 } = req.query;
      const response = await client.post.getCategoryPostsByCursor({
        categoryId: id,
        count,
        cursor,
      });
      return res.status(response.statusCode).json(response.body);
    }
  ),

  Route.DELETE(
    "/{id}",
    "deleteCategoryById",
    { id: Parameter.Path(Schema.String()) },
    Entities.SuccessShow,
    async (req, res) => {
      const { id } = req.params;
      const response = await client.post.deleteCategoryById({ id });
      return res.status(response.statusCode).json(response.body);
    },
    { middlewares: [authenticate] }
  ),
]);
