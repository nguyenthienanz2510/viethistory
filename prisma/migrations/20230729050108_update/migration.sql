/*
  Warnings:

  - You are about to drop the column `role_id` on the `vh_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `vh_roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `vh_roles` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `vh_categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `status` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `vh_posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `role` to the `vh_users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `vh_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "vh_users" DROP CONSTRAINT "vh_users_role_id_fkey";

-- AlterTable
ALTER TABLE "vh_categories" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vh_media" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vh_posts" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vh_users" DROP COLUMN "role_id",
ADD COLUMN     "role" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "vh_user_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vh_user_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vh_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vh_user_status_id_key" ON "vh_user_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_user_status_name_key" ON "vh_user_status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vh_status_id_key" ON "vh_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_status_name_key" ON "vh_status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vh_roles_id_key" ON "vh_roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_roles_name_key" ON "vh_roles"("name");

-- AddForeignKey
ALTER TABLE "vh_users" ADD CONSTRAINT "vh_users_role_fkey" FOREIGN KEY ("role") REFERENCES "vh_roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_users" ADD CONSTRAINT "vh_users_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_user_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
