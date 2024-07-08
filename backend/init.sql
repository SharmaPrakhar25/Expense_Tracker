-- init.sql
CREATE DATABASE IF NOT EXISTS `expense_tracker`;
USE `expense_tracker`;
-- Grant all privileges to root user (for testing purposes)
GRANT ALL PRIVILEGES ON `expense_tracker`.* TO 'root'@'%';
