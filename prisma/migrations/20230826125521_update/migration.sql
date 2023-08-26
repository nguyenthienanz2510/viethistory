/*
  Warnings:

  - You are about to drop the column `avatar` on the `vh_users` table. All the data in the column will be lost.
  - Made the column `first_name` on table `vh_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `vh_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "vh_users" DROP COLUMN "avatar",
ADD COLUMN     "avatar_id" INTEGER,
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "vh_users" ADD CONSTRAINT "vh_users_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "vh_media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
