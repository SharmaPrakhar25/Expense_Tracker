/*
  Warnings:

  - You are about to drop the column `amount` on the `user_expense` table. All the data in the column will be lost.
  - Added the required column `owner_user_id` to the `expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shared_amount` to the `user_expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shared_with_user_id` to the `user_expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_expense` DROP FOREIGN KEY `user_expense_user_id_fkey`;

-- AlterTable
ALTER TABLE `expense` ADD COLUMN `owner_user_id` INTEGER NOT NULL,
    ADD COLUMN `total_amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user_expense` DROP COLUMN `amount`,
    ADD COLUMN `shared_amount` INTEGER NOT NULL,
    ADD COLUMN `shared_with_user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_owner_user_id_fkey` FOREIGN KEY (`owner_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_expense` ADD CONSTRAINT `user_expense_shared_with_user_id_fkey` FOREIGN KEY (`shared_with_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
