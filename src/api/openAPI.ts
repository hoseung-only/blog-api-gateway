import { Router } from "express";
import { OpenAPIObject } from "openapi3-ts";

export const openAPISpec: OpenAPIObject = {
  openapi: "3.0.1",
  info: {
    title: "hoseungJangBlogAPI",
    version: "1.0.0",
  },
  paths: {
    "/categories": {
      get: {
        operationId: "getAllCategories",
        responses: {
          200: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AllCategoriesShow",
                },
              },
            },
          },
        },
      },
      post: {
        operationId: "createCategory",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  parantId: {
                    type: "string",
                  },
                },
                required: ["name", "parantId"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CategoryShow",
                },
              },
            },
          },
        },
      },
    },
    "/categories/{id}": {
      delete: {
        operationId: "deleteCategoryById",
        parameters: [
          {
            required: true,
            name: "id",
            in: "path",
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessShow",
                },
              },
            },
          },
        },
      },
    },
    "/posts": {
      get: {
        operationId: "getPostsByCursor",
        parameters: [
          {
            required: false,
            name: "cursor",
            in: "query",
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PostListShow",
                },
              },
            },
          },
        },
      },
      post: {
        operationId: "createPost",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  ids: {
                    type: "array",
                    items: {
                      type: "number",
                    },
                  },
                },
                required: ["ids"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PostShow",
                },
              },
            },
          },
        },
      },
    },
    "/posts/{id}": {
      get: {
        operationId: "getPost",
        parameters: [
          {
            required: true,
            name: "id",
            in: "path",
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PostShow",
                },
              },
            },
          },
        },
      },
      delete: {
        operationId: "deletePostById",
        parameters: [
          {
            required: true,
            name: "id",
            in: "path",
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessShow",
                },
              },
            },
          },
        },
      },
    },
    "/sessions": {
      post: {
        operationId: "createSession",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SessionShow",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CategoryShow: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
          parentId: {
            type: "number",
          },
        },
        required: ["id", "name"],
      },
      AllCategoriesShow: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                name: {
                  type: "string",
                },
                children: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                      name: {
                        type: "number",
                      },
                    },
                    required: ["id", "name"],
                  },
                },
              },
              required: ["id", "name", "children"],
            },
          },
        },
        required: ["data"],
      },
      SuccessShow: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
          },
        },
        required: ["success"],
      },
      PostShow: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          title: {
            type: "string",
          },
          content: {
            type: "string",
          },
          categoryId: {
            type: "number",
          },
          createdAt: {
            type: "number",
          },
        },
        required: ["id", "title", "content", "categoryId", "createdAt"],
      },
      PostListShow: {
        type: "object",
        properties: {
          posts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PostShow",
            },
          },
          nextSursor: {
            type: "number",
            nullable: true,
          },
        },
        required: ["posts", "nextCursor"],
      },
      SessionShow: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
        },
        required: ["token"],
      },
    },
  },
};

export function applyOpenAPIRouter(rootRouter: Router) {
  const router = Router();

  router.get("/", (req, res) => {
    return res.status(200).json(openAPISpec);
  });

  rootRouter.use("/openapi", router);
}
