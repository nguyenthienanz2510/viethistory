-- DropForeignKey
ALTER TABLE "vh_post_category" DROP CONSTRAINT "vh_post_category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "vh_post_category" DROP CONSTRAINT "vh_post_category_post_id_fkey";

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "vh_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vh_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
