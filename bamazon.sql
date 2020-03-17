DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    product_id VARCHAR(100) NULL
,
    product_name VARCHAR
(100) NULL,
    department_name VARCHAR
(100) NULL,
    price DECIMAL
(10,2) NULL,
    stock_quantity DECIMAL
(10)NULL,
    product_sales VARCHAR (100) NULL
);

INSERT INTO products
    (product_id, product_name, department_name, price, stock_quantity)
VALUES
    (123, "Toilet paper", "Household items", "20", 1),
    (234, "Paper towels", "Household items", "14.50", 120),
    (345, "Apples", "Organic Produce", "2.20", 170),
    (456, "Granola", "Sundries", "4", 20),
    (567, "Dell Laptop", "Electronics", "890", 10),
    (678, "Samsung TV", "Electronics", "2000", 67),
    (789, "Shampoo", "Beauty", "43", 190),
    (890, "Necklace", "Accessories", "54", 2),
    (901, "Toothpaste", "Dental care", "7", 432),
    (112, "Potato", "Organic Produce", "9", 3);

-- CREATE TABLE departments
-- (
--     department_id VARCHAR (100) NULL,
--     department_name VARCHAR (100) NULL,
--     over_head_costs VARCHAR (100) NULL
-- );

-- INSERT INTO departments
--     (department_id, department_name, over_head_costs)
-- VALUES
--     (1, "Sales", 3000);