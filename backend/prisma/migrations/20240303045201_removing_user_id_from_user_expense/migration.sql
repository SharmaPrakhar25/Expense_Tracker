/*
  Warnings:

  - The primary key for the `user_expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user_expense` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `user_expense_user_id_fkey` ON `user_expense`;

-- AlterTable
ALTER TABLE `user_expense` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD PRIMARY KEY (`expense_id`);
