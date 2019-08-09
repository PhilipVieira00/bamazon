USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'D0nu7m3w3rs22!';
GRANT ALL PRIVILEGES ON bamazon_db.* TO 'root'@'localhost';
DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;
USE bamazon_db;

CREATE TABLE products(
position INT NOT NULL,
item_id VARCHAR(100) NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,4) NULL,
stock DECIMAL(10,4) NULL,
PRIMARY KEY (position)
);

SELECT * FROM products;
