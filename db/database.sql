CREATE DATABASE companydb;

SHOW DATABASE;

USE comanydb;

DESCRIBE  customers;


/*
update customers set created = current_timestamp() where id = 1;
ALTER TABLE customers MODIFY COLUMN created datetime default current_timestamp(); 
*/