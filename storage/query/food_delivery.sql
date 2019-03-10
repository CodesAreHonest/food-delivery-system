# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.36-MariaDB)
# Database: food_delivery
# Generation Time: 2019-03-10 06:53:57 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_username` varchar(100) NOT NULL,
  `s_email` varchar(255) NOT NULL,
  `s_role` varchar(50) DEFAULT NULL,
  `s_password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `s_username`, `s_email`, `s_role`, `s_password`, `created_at`, `updated_at`)
VALUES
	(1,'admin01','admin01@gmail.com','super_admin','$2y$10$kBKll5TX88fd8OUTK2AGS.9vv69xpc1lnpbpNXZ4dvBPGf3K84V1y','2019-02-17 20:36:09','2019-02-20 08:27:36'),
	(2,'admin02','admin02@gmail.com','super_admin','$2y$10$kBKll5TX88fd8OUTK2AGS.9vv69xpc1lnpbpNXZ4dvBPGf3K84V1y','2019-02-17 20:36:38','2019-02-17 20:36:38'),
	(3,'admin03','admin03@gmail.com','admin','$2y$10$FgJUUKyDzJcpmq73lcwyOeTqRlh1rwX6QGC/iaKB8GXCyx5Jtz.G6','2019-02-24 22:23:44','2019-02-24 22:23:44');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table delivery
# ------------------------------------------------------------

DROP TABLE IF EXISTS `delivery`;

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_username` varchar(50) NOT NULL,
  `s_name` varchar(255) NOT NULL,
  `s_password` varchar(255) NOT NULL,
  `s_address` varchar(255) NOT NULL,
  `s_com_description` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table food
# ------------------------------------------------------------

DROP TABLE IF EXISTS `food`;

CREATE TABLE `food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(255) NOT NULL,
  `f_price` decimal(10,2) NOT NULL,
  `s_category` varchar(50) NOT NULL,
  `s_description` varchar(255) NOT NULL,
  `s_image` varchar(255) DEFAULT NULL,
  `s_restaurant_id` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_username` varchar(50) NOT NULL,
  `s_email` varchar(100) NOT NULL,
  `s_password` varchar(255) NOT NULL DEFAULT '',
  `s_address` varchar(255) NOT NULL DEFAULT '',
  `s_city` varchar(100) DEFAULT NULL,
  `s_state` varchar(100) DEFAULT NULL,
  `s_country` varchar(100) DEFAULT NULL,
  `s_card_name` varchar(50) DEFAULT NULL,
  `s_card_number` varchar(17) DEFAULT NULL,
  `s_expired_date` char(6) DEFAULT NULL,
  `n_cvc` char(6) DEFAULT NULL,
  `b_card_information` tinyint(1) DEFAULT '0',
  `s_status` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table restaurant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `restaurant`;

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_restaurant_id` varchar(50) NOT NULL DEFAULT '',
  `s_restaurant_name` varchar(100) NOT NULL DEFAULT '',
  `s_password` varchar(255) NOT NULL DEFAULT '',
  `s_address` varchar(255) NOT NULL DEFAULT '',
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table shopping_cart
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shopping_cart`;

CREATE TABLE `shopping_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_food_id` int(11) NOT NULL,
  `s_member_email` varchar(100) NOT NULL DEFAULT '',
  `n_quantity` int(11) NOT NULL,
  `f_price` decimal(10,2) NOT NULL,
  `f_total_price` decimal(13,2) NOT NULL,
  `b_paid` int(11) DEFAULT '0',
  `dt_paid` datetime DEFAULT NULL,
  `s_delivery_status` set('paid','shipped','delivered','rejected') DEFAULT NULL,
  `s_delivery_id` varchar(100) DEFAULT NULL,
  `s_delivery_fee` decimal(12,2) DEFAULT '5.00',
  `dt_delivery_shipped` datetime DEFAULT NULL,
  `dt_delivery_delivered` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
