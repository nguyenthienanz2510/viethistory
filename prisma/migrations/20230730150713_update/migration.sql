/*
  Warnings:

  - You are about to drop the column `url` on the `vh_media` table. All the data in the column will be lost.
  - Added the required column `destination` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encoding` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `vh_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `vh_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vh_media" DROP COLUMN "url",
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "encoding" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;
