import { z } from "zod";
import { zBookmarkTagSchema } from "@/lib/types/api/tags";

export const zBookmarkedLinkSchema = z.object({
  type: z.literal("link"),
  url: z.string().url(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  imageUrl: z.string().url().nullish(),
  favicon: z.string().url().nullish(),
});
export type ZBookmarkedLink = z.infer<typeof zBookmarkedLinkSchema>;

export const zBookmarkContentSchema = z.discriminatedUnion("type", [
  zBookmarkedLinkSchema,
]);
export type ZBookmarkContent = z.infer<typeof zBookmarkContentSchema>;

export const zBookmarkSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  archived: z.boolean(),
  favourited: z.boolean(),
  tags: z.array(zBookmarkTagSchema),
  content: zBookmarkContentSchema,
});
export type ZBookmark = z.infer<typeof zBookmarkSchema>;

// POST /v1/bookmarks
export const zNewBookmarkRequestSchema = zBookmarkContentSchema;
export type ZNewBookmarkRequest = z.infer<typeof zNewBookmarkRequestSchema>;

// GET /v1/bookmarks
export const zGetBookmarksResponseSchema = z.object({
  bookmarks: z.array(zBookmarkSchema),
});
export type ZGetBookmarksResponse = z.infer<typeof zGetBookmarksResponseSchema>;
