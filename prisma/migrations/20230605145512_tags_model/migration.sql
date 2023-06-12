/*
  Warnings:

  - Added the required column `channel_id` to the `buyer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `buyer` ADD COLUMN `channel_id` INTEGER UNSIGNED NOT NULL;
