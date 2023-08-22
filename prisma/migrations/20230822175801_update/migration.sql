-- DropForeignKey
ALTER TABLE "vh_categories_translations" DROP CONSTRAINT "vh_categories_translations_category_id_fkey";

-- DropForeignKey
ALTER TABLE "vh_media_translations" DROP CONSTRAINT "vh_media_translations_media_id_fkey";

-- DropForeignKey
ALTER TABLE "vh_posts_translations" DROP CONSTRAINT "vh_posts_translations_post_id_fkey";

-- AddForeignKey
ALTER TABLE "vh_posts_translations" ADD CONSTRAINT "vh_posts_translations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "vh_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories_translations" ADD CONSTRAINT "vh_categories_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vh_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media_translations" ADD CONSTRAINT "vh_media_translations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "vh_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
