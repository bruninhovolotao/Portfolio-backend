/*
  Warnings:

  - Made the column `slug` on table `blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `projetos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "blog" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "projetos" ALTER COLUMN "slug" SET NOT NULL;
