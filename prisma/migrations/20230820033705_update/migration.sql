/*
  Warnings:

  - You are about to drop the `Languages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "vh_categories_translations" DROP CONSTRAINT "vh_categories_translations_language_code_fkey";

-- DropForeignKey
ALTER TABLE "vh_media_translations" DROP CONSTRAINT "vh_media_translations_language_code_fkey";

-- DropForeignKey
ALTER TABLE "vh_posts_translations" DROP CONSTRAINT "vh_posts_translations_language_code_fkey";

-- DropTable
DROP TABLE "Languages";

-- CreateTable
CREATE TABLE "vh_languages" (
    "id" SERIAL NOT NULL,
    "ietf_tag" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "vh_languages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vh_languages_id_key" ON "vh_languages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_languages_language_code_key" ON "vh_languages"("language_code");

-- AddForeignKey
ALTER TABLE "vh_posts_translations" ADD CONSTRAINT "vh_posts_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "vh_languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories_translations" ADD CONSTRAINT "vh_categories_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "vh_languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media_translations" ADD CONSTRAINT "vh_media_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "vh_languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;
