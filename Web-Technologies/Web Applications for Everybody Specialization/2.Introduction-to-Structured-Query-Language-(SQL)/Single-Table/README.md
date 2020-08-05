# Autograder: Single-table SQL (Users)

## Specifications

First, create a MySql database or use an existing database (make sure to use a UTF8 character set) and then create a table in the database called "Ages":

CREATE TABLE Ages ( 
  name VARCHAR(128), 
  age INTEGER
)

## Sample Data

DELETE FROM Ages;
INSERT INTO Ages (name, age) VALUES ('Zahra', 34);
INSERT INTO Ages (name, age) VALUES ('Olufunke', 23);
INSERT INTO Ages (name, age) VALUES ('Choire', 38);
INSERT INTO Ages (name, age) VALUES ('Makenna', 32);
INSERT INTO Ages (name, age) VALUES ('Ula', 16);
INSERT INTO Ages (name, age) VALUES ('Garren', 40);

SELECT sha1(CONCAT(name,age)) AS X FROM Ages ORDER BY X
