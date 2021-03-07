import * as request from "supertest";
import { expect } from "chai";

import { app } from "../app";

describe("Helloworld Routers", () => {
  describe("GET /helloworld: get 'Hello World' string", () => {
    context("When user requests", () => {
      it("should return 'Hello World' string", async () => {
        return request(app)
          .get("/helloworld")
          .expect(200)
          .then((response) => {
            const { message } = response.body;

            expect(message).to.be.eq("Hello World");
          })
          .catch((error) => {
            throw error;
          });
      });
    });

    context("When user requests with message query", () => {
      it("should return received message intactly", async () => {
        return request(app)
          .get("/helloworld")
          .query({ message: "test" })
          .expect(200)
          .then((response) => {
            const { message } = response.body;

            expect(message).to.be.eq("test");
          })
          .catch((error) => {
            throw error;
          });
      });
    });
  });
});
