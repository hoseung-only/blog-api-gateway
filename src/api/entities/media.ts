import { Schema } from "request-typer";

export const PresignedPostShow = Schema.Object({
  url: Schema.String(),
  fields: Schema.Dict(Schema.String()),
});
