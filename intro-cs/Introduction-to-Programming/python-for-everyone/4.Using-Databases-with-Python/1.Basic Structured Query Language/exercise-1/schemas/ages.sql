BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `ages` (
	`name`	INTEGER,
	`age`	INTEGER
);
INSERT INTO `ages` VALUES ('Declain',37);
INSERT INTO `ages` VALUES ('Jaidyn',24);
INSERT INTO `ages` VALUES ('Eris',29);
INSERT INTO `ages` VALUES ('Siubhan',29);
INSERT INTO `ages` VALUES ('Kaydyne',21);
INSERT INTO `ages` VALUES ('kariss',18);
COMMIT;
