-- power_metter.hs_measurement definition

CREATE TABLE `hs_measurement` (
  `measurement_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `circuit_id` int DEFAULT NULL,
  `voltage_measurement` decimal(15,5) DEFAULT NULL,
  `current_measurement` decimal(15,5) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`measurement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;