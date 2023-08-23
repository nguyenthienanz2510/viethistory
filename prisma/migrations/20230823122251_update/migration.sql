/*
  Warnings:

  - The primary key for the `vh_post_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `vh_post_category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vh_post_category" DROP CONSTRAINT "vh_post_category_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "vh_post_category_pkey" PRIMARY KEY ("post_id", "category_id");
