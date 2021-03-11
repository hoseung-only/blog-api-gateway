import * as request from "supertest";
import { expect } from "chai";

import { app } from "../app";

import { AuthService } from "../services/auth";

describe("Session Routers", () => {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;

  describe("POST / : create session", () => {
    context("when admin requests with valid account informations", () => {
      it("should create a new session", async () => {
        return request(app)
          .post("/sessions")
          .send({ email, password })
          .expect(201)
          .then((response) => {
            expect(AuthService.verifyJWT(response.body.token)).not.to.be.null;
          })
          .catch((error) => {
            throw error;
          });
      });
    });

    context("when admin requests with invalid email", () => {
      it("should return 401", async () => {
        return request(app)
          .post("/sessions")
          .send({ email: "invalid", password })
          .expect(401);
      });
    });

    context("when admin requests with invalid password", () => {
      it("should return 401", async () => {
        return request(app)
          .post("/sessions")
          .send({ email, password: "invalid" })
          .expect(401);
      });
    });
  });
});
