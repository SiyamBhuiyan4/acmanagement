# AI Agent Rules & Guidelines

## ⚠️ STRICT RULE: NEVER TOUCH OR MIGRATE DATABASE DATA
1. **DO NOT MODIFY DATABASE DATA**:
   - Never run data migrations, backfills, or data cleanup mutations (e.g., `npx convex run migrations:...` or any data-altering mutations) against the Convex database unless the user explicitly and directly commands you to do so.
2. **MERGING IS CODE & SCHEMA ONLY**:
   - When asked to "merge" or pull updates from a branch or remote repository, **merge ONLY the codebase and schema**.
   - **NEVER merge, overwrite, import, or migrate database data from anywhere.**
3. **DATABASE MUTATION RESTRICTIONS**:
   - Never alter, delete, patch, or overwrite live database documents/records without explicit prior confirmation from the user.
   - Dry runs or tests must not perform any mutations on live databases.

---

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
