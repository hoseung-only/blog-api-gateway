import { Resolve } from "request-typer";

import * as Entities from "../entities";

export function presentSession({ token }: { token: string }): Resolve<typeof Entities.SessionShow> {
  return { token };
}
