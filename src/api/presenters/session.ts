import * as Entities from "../entities";

export function presentSession({
  token,
}: {
  token: string;
}): Entities.SessionShow {
  return { token };
}
