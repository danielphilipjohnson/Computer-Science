CREATE TABLE Ages ( 
  name VARCHAR(128), 
  age INTEGER
)

DELETE FROM Ages;
INSERT INTO Ages (name, age) VALUES ('Capri', 13);
INSERT INTO Ages (name, age) VALUES ('Alfred', 13);
INSERT INTO Ages (name, age) VALUES ('Tyllor', 31);
INSERT INTO Ages (name, age) VALUES ('Michelle', 17);

SELECT sha1(CONCAT(name,age)) AS X FROM Ages ORDER BY X;