-- CreateTable
CREATE TABLE "vh_roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vh_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_user_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vh_user_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "username" TEXT NOT NULL,
    "phone_number" TEXT,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vh_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_languages" (
    "id" SERIAL NOT NULL,
    "ietf_tag" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "vh_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "thumb_id" INTEGER,
    "images" TEXT,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "is_featured" BOOLEAN,
    "order" INTEGER,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_created_id" TEXT NOT NULL,
    "user_updated_id" TEXT NOT NULL,

    CONSTRAINT "vh_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_posts_translations" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,

    CONSTRAINT "vh_posts_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_categories" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "thumb_id" INTEGER,
    "images" TEXT,
    "is_featured" BOOLEAN,
    "order" INTEGER,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_created_id" TEXT NOT NULL,
    "user_updated_id" TEXT NOT NULL,

    CONSTRAINT "vh_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_categories_translations" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,

    CONSTRAINT "vh_categories_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vh_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_post_category" (
    "post_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "vh_post_category_pkey" PRIMARY KEY ("post_id","category_id")
);

-- CreateTable
CREATE TABLE "vh_media" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "url_cdn" TEXT,
    "title" TEXT,
    "alt" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_created_id" TEXT NOT NULL,
    "user_updated_id" TEXT NOT NULL,

    CONSTRAINT "vh_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vh_media_translations" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT,
    "alt" TEXT,
    "description" TEXT,

    CONSTRAINT "vh_media_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vh_roles_id_key" ON "vh_roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_roles_name_key" ON "vh_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vh_user_status_id_key" ON "vh_user_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_user_status_name_key" ON "vh_user_status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_id_key" ON "vh_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_email_key" ON "vh_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_username_key" ON "vh_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "vh_languages_id_key" ON "vh_languages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_languages_language_code_key" ON "vh_languages"("language_code");

-- CreateIndex
CREATE UNIQUE INDEX "vh_posts_slug_key" ON "vh_posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vh_categories_slug_key" ON "vh_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "vh_status_id_key" ON "vh_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_status_name_key" ON "vh_status"("name");

-- AddForeignKey
ALTER TABLE "vh_users" ADD CONSTRAINT "vh_users_role_fkey" FOREIGN KEY ("role") REFERENCES "vh_roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_users" ADD CONSTRAINT "vh_users_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_user_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_thumb_id_fkey" FOREIGN KEY ("thumb_id") REFERENCES "vh_media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts_translations" ADD CONSTRAINT "vh_posts_translations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "vh_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts_translations" ADD CONSTRAINT "vh_posts_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "vh_languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_thumb_id_fkey" FOREIGN KEY ("thumb_id") REFERENCES "vh_media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories_translations" ADD CONSTRAINT "vh_categories_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vh_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories_translations" ADD CONSTRAINT "vh_categories_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "vh_languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "vh_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vh_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media_translations" ADD CONSTRAINT "vh_media_translations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "vh_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media_translations" ADD CONSTRAINT "vh_media_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "vh_languages"("language_code") ON DELETE RESTRICT ON UPDATE CASCADE;
