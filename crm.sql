USE crm_db;

-- CREATE table customer_owner_connection(
--     connection_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     firstContactDate VARCHAR(30),
--     firstContactTime VARCHAR(30),
--     emailType VARCHAR(30),
--     sold BOOLEAN,
--     customerId VARCHAR(30),
--     ownerId INT,
--     FOREIGN KEY (customerId) REFERENCES customer('customer_id'),
--     FOREIGN KEY (ownerId) REFERENCES owner('owner_id')

-- SELECT owner_id FROM owner WHERE owner_first_name='Shlomi'


-- UPDATE customer 
-- SET  first_name='lior', last_name='Chaky',country='Iraq'
-- WHERE customer_id='0m6dtL'

-- select customer.first_name, customer.last_name, customer.email, customer.country,
--     customer_owner_connection.firstContactDate, customer_owner_connection.sold,
--     owner.owner_first_name, owner_last_name
-- from customer_owner_connection
--     JOIN customer
--     ON customer_owner_connection.customerId=customer.customer_id
--     JOIN owner
--     ON customer_owner_connection.ownerId=owner.owner_id

-- SELECT * FROM customer WHERE customer_id="5b9f48a20059bdc03c5ea731"

-- CREATE table customer_owner_connection(
--     connection_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     firstContactDate VARCHAR(30),
--     firstContactTime VARCHAR(30),
--     emailType VARCHAR(30),
--     sold BOOLEAN,
--     customerId VARCHAR(30),
--     ownerId INT,
--     FOREIGN KEY (customerId) REFERENCES customer(customer_id),
--     FOREIGN KEY (ownerId) REFERENCES owner(owner_id)

-- INSERT INTO customer_owner_connection VALUES (null, '10-10-2019', '21:22:00', 'B', 1 , '5b9f48a20059bdc03c5ea731', '2')
-- INSERT INTO customer_owner_connection VALUES (null, '10-10-2018', '21:00:00', null, 1 , '5b9f48a20059bdc03c5ea731', '1')

-- CREATE table customer_owner_connection(
--     connection_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     firstContactDate VARCHAR(30),
--     firstContactTime VARCHAR(30),
--     emailType VARCHAR(30),
--     sold BOOLEAN,
--     customerId VARCHAR(30),
--     ownerId INT,
--     FOREIGN KEY (customerId) REFERENCES customer(customer_id),
--     FOREIGN KEY (ownerId) REFERENCES owner(owner_id)
-- )

-- CREATE TABLE customer(
--     customer_id VARCHAR(30) NOT NULL,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     email VARCHAR(40),
--     country VARCHAR(30),
--     PRIMARY KEY (customer_id)
-- );

-- create table owner(
--     owner_id INT NOT NULL AUTO_INCREMENT, 
--     owner_first_name VARCHAR(30),
--     owner_last_name VARCHAR(30),
--     PRIMARY KEY (owner_id)
-- )

-- select * from customer_owner_connection
-- JOIN customer 
-- ON customerId=customer_id


-- select * from customer_owner_connection, customer 
-- WHERE customer_owner_connection.customerId=customer.customer_id



-- INSERT INTO customer_owner_connection VALUES (null, '10-10-2018', '21:00:00', 'D', 1 , '5b9f48a20059bdc03c5ea731', '1')



-- SELECT* FROM customer 
-- where first_name='Johanston'
-- AND last_name='Gilbert'

-- drop table customer;


-- CREATE TABLE customer
-- (
--     id VARCHAR(30) PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     email VARCHAR(30),
--     firstContact DATE,
--     emailType VARCHAR(5),
--     sold BOOLEAN,
--     owner VARCHAR(30),
--     country VARCHAR(30)
-- );

-- CREATE table conversations(
--     conversation_id INT NOT NULL AUTO_INCREMENT ,
--     user_id1 INT,
--     user_id2 INT,
--     FOREIGN KEY (user_id1) REFERENCES users(userId),
--     FOREIGN KEY (user_id2) REFERENCES users(userId),
--     PRIMARY KEY (conversation_id)
-- );