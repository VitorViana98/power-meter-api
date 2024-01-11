CREATE DATABASE `power_metter` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- power_metter.tb_users definition
CREATE TABLE `tb_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_login` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `user_admin` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- power_metter.tb_circuits definition
CREATE TABLE `tb_circuits` (
  `circuit_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `circuit_name` varchar(255) DEFAULT NULL,
  `circuit_description` text,
  PRIMARY KEY (`circuit_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tb_circuits_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- power_metter.currents definition
CREATE TABLE `currents` (
  `current_id` int NOT NULL AUTO_INCREMENT,
  `circuit_id` int NOT NULL,
  `current_measurement` decimal(15,5) DEFAULT NULL,
  `timestamp` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `millis` int NOT NULL,
  PRIMARY KEY (`current_id`),
  KEY `circuit_id` (`circuit_id`),
  CONSTRAINT `currents_ibfk_1` FOREIGN KEY (`circuit_id`) REFERENCES `tb_circuits` (`circuit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32183 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
