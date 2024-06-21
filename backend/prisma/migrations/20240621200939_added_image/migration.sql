/*
  Warnings:

  - Added the required column `imageURL` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "imageURL" TEXT NOT NULL;
