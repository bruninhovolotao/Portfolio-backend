/*
  Warnings:

  - The `conteudo` column on the `blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `conteudo` column on the `projetos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "blog" DROP COLUMN "conteudo",
ADD COLUMN     "conteudo" JSONB;

-- AlterTable
ALTER TABLE "projetos" DROP COLUMN "conteudo",
ADD COLUMN     "conteudo" JSONB;
