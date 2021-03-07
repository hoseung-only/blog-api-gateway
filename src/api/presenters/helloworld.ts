import * as Entities from "../entities";

export function presentHelloworld(message: string): Entities.Helloworld {
  return {
    message,
  };
}
