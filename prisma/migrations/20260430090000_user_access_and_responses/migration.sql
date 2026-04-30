-- Per-user module allow-list. Admins bypass the check entirely; STUDENT
-- rows get an empty array by default and require explicit assignment.
ALTER TABLE "User"
  ADD COLUMN "accessibleModuleIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- Full denormalized response log per result. Reviews read from this so the
-- history stays intact after the underlying question bank changes. Null on
-- legacy rows; new saves populate it alongside `mistakes`.
ALTER TABLE "Result" ADD COLUMN "responses" JSONB;
