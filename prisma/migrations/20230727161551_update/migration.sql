/*
  Warnings:

  - Added the required column `user_updated_id` to the `vh_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vh_media" ADD COLUMN     "user_updated_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
