import { Router } from "express";

import { client } from "@hoseung-only/blog-microservice-sdk";

export const applyStaticRouters = (rootRouter: Router) => {
  const router = Router();

  router.get("/recent-posts-svg", async (_, res, next) => {
    try {
      const posts = (await client.post.getPostsByCursor({ count: 4 })).body;
      res.setHeader("Content-Type", "image/svg+xml");
      return res.status(200).send(`
          <svg xmlns="http://www.w3.org/2000/svg" width="500" height="110">
            <style>
              a {
                font-size: 16px;
                font-weight: 700;
                line-height: 18px;

                fill: rgb(88, 172, 250);
                text-decoration: underline;
              }
            </style>
            ${posts.data
              .map((post, index) => {
                const y = 18 * (index + 1) + 10 * index;
                return `
                  <a href="https://blog.hoseung.me/posts/${post.id}">
                    <text x="0" y="${y}">${post.title}</text>
                  </a>
                `;
              })
              .join("\n")}
          </svg>
        `);
    } catch (error) {
      return next(error);
    }
  });

  rootRouter.use("/static", router);
};
