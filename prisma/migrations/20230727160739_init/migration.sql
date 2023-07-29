-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'manager', 'editor', 'author', 'subscriber');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'blocked', 'deleted');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('private', 'draft', 'publish', 'deleted');

-- CreateTable
CREATE TABLE "vh_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "username" TEXT NOT NULL,
    "phone_number" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'active',
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
    "slug" TEXT,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "thumb" INTEGER,
    "images" TEXT,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "order" INTEGER,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "meta_keywords" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_created_id" TEXT NOT NULL,
    "user_updated_id" TEXT NOT NULL,

    CONSTRAINT "vh_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_categories" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "status" "Status" NOT NULL,
    "thumb" INTEGER,
    "images" TEXT,
    "order" INTEGER,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "meta_keywords" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_created_id" TEXT NOT NULL,
    "user_updated_id" TEXT NOT NULL,

    CONSTRAINT "vh_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_post_category" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "vh_post_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "url_cdn" TEXT,
    "title" TEXT,
    "alt" TEXT,
    "description" TEXT,
    "user_created_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vh_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_id_key" ON "vh_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_email_key" ON "vh_users"("email");

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "vh_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vh_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
