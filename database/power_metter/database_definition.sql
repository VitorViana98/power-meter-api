CREATE DATABASE `power_metter` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- power_metter.tb_circuits definition
CREATE TABLE `tb_circuits` (
  `circuit_id` int NOT NULL AUTO_INCREMENT,
  `circuit_name` varchar(255) DEFAULT NULL,
  `circuit_description` text,
  PRIMARY KEY (`circuit_id`)
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
