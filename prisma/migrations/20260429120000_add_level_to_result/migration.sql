-- Add a nullable difficulty bucket to Result. Existing rows stay null;
-- only modules that declare difficulty levels (e.g. fractions) populate it.
ALTER TABLE "Result" ADD COLUMN "level" INTEGER;
