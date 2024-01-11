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