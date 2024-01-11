-- power_metter.voltages definition

CREATE TABLE `voltages` (
  `voltage_id` int NOT NULL AUTO_INCREMENT,
  `circuit_id` int NOT NULL,
  `voltage_measurement` decimal(15,5) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`voltage_id`),
  KEY `circuit_id` (`circuit_id`),
  CONSTRAINT `voltages_ibfk_1` FOREIGN KEY (`circuit_id`) REFERENCES `tb_circuits` (`circuit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=281 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;