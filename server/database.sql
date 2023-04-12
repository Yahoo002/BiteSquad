CREATE DATABASE bitesquad;

CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(255));

CREATE TABLE restaurants(id SERIAL PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), description TEXT, rating FLOAT, admin_id INTEGER REFERENCES users(id));

CREATE TABLE menus(id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT, price FLOAT, image VARCHAR(255), restaurant_id INTEGER REFERENCES restaurants(id));

CREATE TABLE orders(id SERIAL PRIMARY KEY, customer_id INTEGER REFERENCES users(id), restaurant_id INTEGER REFERENCES restaurants(id), menu_id INTEGER REFERENCES menus(id), status VARCHAR(255), payment_id VARCHAR(255), amount FLOAT);

CREATE TABLE delivery_partners(id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), restaurant_id INTEGER REFERENCES restaurants(id));

CREATE TABLE delivery_details(id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id), partner_id INTEGER REFERENCES delivery_partners(id), delivery_time TIMESTAMP);