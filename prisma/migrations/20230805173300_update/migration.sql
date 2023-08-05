/*
  Warnings:

  - You are about to drop the column `destination` on the `vh_media` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `vh_media` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `vh_media` table. All the data in the column will be lost.
  - Added the required column `format` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource_type` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `vh_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vh_media" DROP COLUMN "destination",
DROP COLUMN "mimetype",
DROP COLUMN "path",
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "resource_type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
