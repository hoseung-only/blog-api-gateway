import { Switch, Route, Parameter, Schema } from "typed-express";

import { client } from "@hoseung-only/blog-microservice-sdk";

import * as Entities from "../entities";

export const SearchRouter = new Switch("/search", [
  Route.GET(
    "/",
    "searchPosts",
    {
      query: Parameter.Query(Schema.String()),
      count: Parameter.Query(Schema.Number()),
      cursor: Parameter.Query(Schema.Optional(Schema.Number())),
    },
    Entities.PostListShow,
    async (req, res) => {
      const { query, count, cursor } = req.query;
      const response = await client.post.searchPosts({ query: decodeURIComponent(query), count, cursor });
      return res.status(response.statusCode).json(response.body);
    }
  ),
]);
