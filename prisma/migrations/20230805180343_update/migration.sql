/*
  Warnings:

  - Added the required column `public_id` to the `vh_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vh_media" ADD COLUMN     "public_id" TEXT NOT NULL;
