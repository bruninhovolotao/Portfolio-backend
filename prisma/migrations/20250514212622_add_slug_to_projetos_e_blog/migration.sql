/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `projetos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `projetos` table without a default value. This is not possible if the table is not empty.

*/
-- Para projetos
ALTER TABLE "projetos" ADD COLUMN "slug" TEXT;

-- Gerar slugs temporários com base no título
UPDATE "projetos" SET "slug" = LOWER(REPLACE("titulo", ' ', '-'));

-- Depois torna obrigatório
ALTER TABLE "projetos" ALTER COLUMN "slug" SET NOT NULL;

-- Para blog
ALTER TABLE "blog" ADD COLUMN "slug" TEXT;
UPDATE "blog" SET "slug" = LOWER(REPLACE("titulo", ' ', '-'));
ALTER TABLE "blog" ALTER COLUMN "slug" SET NOT NULL;

