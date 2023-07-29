/*
  Warnings:

  - You are about to drop the column `role` on the `vh_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `vh_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `vh_posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `vh_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_id` to the `vh_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vh_users" DROP COLUMN "role",
ADD COLUMN     "role_id" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "vh_roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vh_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vh_categories_slug_key" ON "vh_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vh_posts_slug_key" ON "vh_posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_username_key" ON "vh_users"("username");

-- AddForeignKey
ALTER TABLE "vh_users" ADD CONSTRAINT "vh_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "vh_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
