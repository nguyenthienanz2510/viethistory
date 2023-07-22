-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'manager', 'editor', 'author', 'subscriber');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'blocked', 'deleted');

-- CreateTable
CREATE TABLE "vh_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "role" "Role" NOT NULL DEFAULT 'subscriber',
    "first_name" TEXT,
    "last_name" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vh_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "thumb" TEXT NOT NULL,
    "images" TEXT[],
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "order" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "meta_keywords" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "vh_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_categories" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "thumb" TEXT NOT NULL,
    "images" TEXT[],
    "order" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "meta_keywords" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vh_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_email_key" ON "vh_users"("email");

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
