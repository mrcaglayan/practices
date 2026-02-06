CREATE DATABASE IF NOT EXISTS `practices_db`;
USE `practices_db`;

CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `confirmedEmail` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
);

CREATE TABLE IF NOT EXISTS `MahsupItem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MahsupItem_userId_idx` (`userId`),
  CONSTRAINT `MahsupItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);
