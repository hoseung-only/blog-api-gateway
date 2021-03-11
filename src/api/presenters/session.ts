import * as Entities from "../entities";

export function presentSession({ token }: Entities.SessionShow) {
  return { token };
}
