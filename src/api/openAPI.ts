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
                  parentId: {
                    type: "number",
                  },
                },
                required: ["name"],
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
      put: {
        operationId: "updateCategory",
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
                  parentId: {
                    type: "number",
                  },
                },
                required: ["name"],
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
                  $ref: "#/components/schemas/CategoryShow",
                },
              },
            },
          },
        },
      },
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
    "/categories/{id}/posts": {
      get: {
        operationId: "getCategoryPostsByCursor",
        parameters: [
          {
            required: true,
            name: "id",
            in: "path",
            schema: {
              type: "number",
            },
          },
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
    },
    "/posts": {
      get: {
        operationId: "getPostsByCursor",
        parameters: [
          {
            required: true,
            name: "count",
            in: "query",
            schema: {
              type: "number",
            },
          },
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
                  title: {
                    type: "string",
                  },
                  coverImageURL: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                  categoryId: {
                    type: "number",
                  },
                  summary: {
                    type: "string",
                  },
                },
                required: ["title", "content", "summary"],
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
      put: {
        operationId: "updatePost",
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  coverImageURL: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                  categoryId: {
                    type: "number",
                  },
                  summary: {
                    type: "string",
                  },
                },
                required: ["title", "content", "summary"],
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
    "/image/presigned_post": {
      get: {
        operationId: "getPresignedPost",
        parameters: [
          {
            required: true,
            name: "fileName",
            in: "query",
            schema: {
              type: "string",
            },
          },
          {
            required: true,
            name: "fileType",
            in: "query",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PresignedPostShow",
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
            nullable: true,
          },
        },
        required: ["id", "name", "parentId"],
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
                        type: "string",
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
          coverImageURL: {
            type: "string",
            nullable: true,
          },
          content: {
            type: "string",
          },
          categoryId: {
            type: "number",
            nullable: true,
          },
          createdAt: {
            type: "number",
          },
          summary: {
            type: "string",
          },
        },
        required: ["id", "title", "coverImageURL", "content", "categoryId", "createdAt", "summary"],
      },
      PostListShow: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PostShow",
            },
          },
          nextCursor: {
            type: "number",
            nullable: true,
          },
        },
        required: ["data", "nextCursor"],
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
      PresignedPostShow: {
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          fields: {
            type: "object",
            additionalProperties: {
              type: "string",
            },
          },
        },
        required: ["url", "fields"],
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
