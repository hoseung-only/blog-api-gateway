import * as JWT from "jsonwebtoken";

export class AuthService {
  public static createJWT() {
    return JWT.sign({}, process.env.JWT_SECRET_KEY!);
  }

  public static verifyJWT(token: string) {
    try {
      return JWT.verify(token, process.env.JWT_SECRET_KEY!);
    } catch (error) {
      return null;
    }
  }

  public static verifyAccount({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return (
      email === process.env.ADMIN_EMAIL! &&
      password === process.env.ADMIN_PASSWORD!
    );
  }
}
