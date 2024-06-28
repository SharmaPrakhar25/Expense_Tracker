/*
  Warnings:

  - Made the column `amount` on table `user_expense` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_expense` MODIFY `amount` INTEGER NOT NULL;
