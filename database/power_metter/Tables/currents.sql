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