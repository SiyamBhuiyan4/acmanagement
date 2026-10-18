import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Fallback stub so any cached frontend bundles expecting this endpoint
 * receive an empty list without throwing an unhandled query error.
 */
export const list = query({
  args: { token: v.optional(v.string()) },
  handler: async () => {
    return [];
  },
});
