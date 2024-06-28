/*
  Warnings:

  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mobile` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `mobile` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;
