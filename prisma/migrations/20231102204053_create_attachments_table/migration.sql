/*
  Warnings:

  - A unique constraint covering the columns `[attachment_proop_of_shipping_id]` on the table `deliveries` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "attachment_proop_of_shipping_id" TEXT;

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_attachment_proop_of_shipping_id_key" ON "deliveries"("attachment_proop_of_shipping_id");

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_attachment_proop_of_shipping_id_fkey" FOREIGN KEY ("attachment_proop_of_shipping_id") REFERENCES "attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
