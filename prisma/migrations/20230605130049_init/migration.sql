-- CreateTable
CREATE TABLE `buyer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buyer_name` TINYTEXT NOT NULL,
    `buyer_phone` VARCHAR(20) NOT NULL,
    `buyer_email` VARCHAR(20) NOT NULL,
    `buyer_description` VARCHAR(255) NOT NULL,
    `buyer_telegram` VARCHAR(255) NOT NULL,
    `ads_format` TINYTEXT NOT NULL,
    `ads_quantity` INTEGER UNSIGNED NOT NULL,
    `ads_sum` INTEGER UNSIGNED NOT NULL,
    `channel_name` TINYTEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `theme` TINYTEXT NOT NULL,
    `language` TINYTEXT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `subscribers` INTEGER UNSIGNED NOT NULL,
    `views` INTEGER UNSIGNED NOT NULL,
    `cpv` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
