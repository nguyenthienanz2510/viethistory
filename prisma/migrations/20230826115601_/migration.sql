/*
  Warnings:

  - The `status` column on the `vh_categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `vh_media` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `vh_posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `vh_users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `vh_users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `vh_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vh_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vh_user_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('subscriber', 'author', 'editor', 'manager', 'admin');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'locked', 'deleted');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('draft', 'publish', 'private');

-- DropForeignKey
ALTER TABLE "vh_categories" DROP CONSTRAINT "vh_categories_status_fkey";

-- DropForeignKey
ALTER TABLE "vh_media" DROP CONSTRAINT "vh_media_status_fkey";

-- DropForeignKey
ALTER TABLE "vh_posts" DROP CONSTRAINT "vh_posts_status_fkey";

-- DropForeignKey
ALTER TABLE "vh_users" DROP CONSTRAINT "vh_users_role_fkey";

-- DropForeignKey
ALTER TABLE "vh_users" DROP CONSTRAINT "vh_users_status_fkey";

-- AlterTable
ALTER TABLE "vh_categories" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'publish';

-- AlterTable
ALTER TABLE "vh_media" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'publish';

-- AlterTable
ALTER TABLE "vh_posts" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'publish';

-- AlterTable
ALTER TABLE "vh_users" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'subscriber',
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'active';

-- DropTable
DROP TABLE "vh_roles";

-- DropTable
DROP TABLE "vh_status";

-- DropTable
DROP TABLE "vh_user_status";
