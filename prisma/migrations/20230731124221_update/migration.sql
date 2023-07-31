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
CREATE TABLE "vh_posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
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
    "status" TEXT NOT NULL,
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
CREATE TABLE "vh_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vh_status_pkey" PRIMARY KEY ("id")
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
    "mimetype" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_id_key" ON "vh_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_email_key" ON "vh_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vh_users_username_key" ON "vh_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "vh_roles_id_key" ON "vh_roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_roles_name_key" ON "vh_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vh_user_status_id_key" ON "vh_user_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vh_user_status_name_key" ON "vh_user_status"("name");

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
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_posts" ADD CONSTRAINT "vh_posts_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_categories" ADD CONSTRAINT "vh_categories_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "vh_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_post_category" ADD CONSTRAINT "vh_post_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vh_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_status_fkey" FOREIGN KEY ("status") REFERENCES "vh_status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_user_updated_id_fkey" FOREIGN KEY ("user_updated_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vh_media" ADD CONSTRAINT "vh_media_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "vh_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
