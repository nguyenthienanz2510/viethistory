/*
  Warnings:

  - You are about to drop the column `meta_keywords` on the `vh_categories` table. All the data in the column will be lost.
  - You are about to drop the column `meta_keywords` on the `vh_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vh_categories" DROP COLUMN "meta_keywords",
ADD COLUMN     "is_featured" BOOLEAN;

-- AlterTable
ALTER TABLE "vh_posts" DROP COLUMN "meta_keywords",
ADD COLUMN     "is_featured" BOOLEAN;

-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "ietf_tag" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_posts_translations" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,

    CONSTRAINT "vh_posts_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_categories_translations" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,

    CONSTRAINT "vh_categories_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_media_translations" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT,
    "alt" TEXT,
    "description" TEXT,

    CONSTRAINT "vh_media_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Languages_id_key" ON "Languages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_language_code_key" ON "Languages"("language_code");

-- AddForeignKey
ALTER TABLE "vh_posts_translations" ADD CONSTRAINT "vh_posts_translations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "vh_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts_translations" ADD CONSTRAINT "vh_posts_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories_translations" ADD CONSTRAINT "vh_categories_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vh_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories_translations" ADD CONSTRAINT "vh_categories_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media_translations" ADD CONSTRAINT "vh_media_translations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "vh_media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media_translations" ADD CONSTRAINT "vh_media_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;
