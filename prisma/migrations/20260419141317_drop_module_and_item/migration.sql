/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_moduleId_fkey";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Module";

-- DropEnum
DROP TYPE "ItemType";
