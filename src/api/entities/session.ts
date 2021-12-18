import { Schema } from "request-typer";

export const SessionShow = Schema.Object({
  token: Schema.String(),
});
