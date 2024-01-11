-- power_metter.tb_circuits definition

CREATE TABLE `tb_circuits` (
  `circuit_id` int NOT NULL AUTO_INCREMENT,
  `circuit_name` varchar(255) DEFAULT NULL,
  `circuit_description` text,
  PRIMARY KEY (`circuit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
