/*
  Warnings:

  - You are about to drop the column `name` on the `Receipt` table. All the data in the column will be lost.
  - Added the required column `description` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL;
