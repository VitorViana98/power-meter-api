-- power_metter.power_factors definition

CREATE TABLE `power_factors` (
  `power_factor_id` int NOT NULL AUTO_INCREMENT,
  `circuit_id` int NOT NULL,
  `power_factor_measurement` decimal(10,5) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`power_factor_id`),
  KEY `circuit_id` (`circuit_id`),
  CONSTRAINT `power_factors_ibfk_1` FOREIGN KEY (`circuit_id`) REFERENCES `tb_circuits` (`circuit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;