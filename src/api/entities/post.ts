import { Schema } from "request-typer";

export const Post = Schema.Object({
  id: Schema.String(),
  title: Schema.String(),
  viewCount: Schema.Number(),
  coverImageURL: Schema.String(),
  content: Schema.String(),
  categoryId: Schema.Nullable(Schema.String()),
  createdAt: Schema.Number(),
  summary: Schema.String(),
});

export const PostListShow = Schema.Object({
  data: Schema.Array(Post),
  nextCursor: Schema.Nullable(Schema.Number()),
});

export const Category = Schema.Object({
  id: Schema.String(),
  name: Schema.String(),
  parentId: Schema.Nullable(Schema.String()),
});

export const AllCategoriesShow = Schema.Object({
  data: Schema.Array(
    Schema.Object({
      id: Schema.String(),
      name: Schema.String(),
      children: Schema.Array(
        Schema.Object({
          id: Schema.String(),
          name: Schema.String(),
        })
      ),
    })
  ),
});

export const SuccessShow = Schema.Object({
  success: Schema.Boolean(),
});
