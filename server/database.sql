CREATE DATABASE bitesquad;

CREATE TABLE users(userId SERIAL PRIMARY KEY, userName VARCHAR(255), mobileNumber VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(255));

CREATE TABLE restaurants(restaurantId SERIAL PRIMARY KEY, restaurantName VARCHAR(255), rating FLOAT, openingTime TIME, closingTime TIME, adminId INTEGER REFERENCES users(userId));

CREATE TABLE menu(menuId SERIAL PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price FLOAT, image VARCHAR(255), restaurant_id INTEGER REFERENCES restaurants(restaurantId));

CREATE TABLE order(orderId SERIAL PRIMARY KEY, userId INTEGER REFERENCES users(userId), restaurant_id INTEGER REFERENCES restaurants(restaurantId), menu_id INTEGER REFERENCES menus(menuId), status VARCHAR(255), paymentId INTEGER, totalPrice FLOAT);

CREATE TABLE deliveryPartner(id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), restaurant_id INTEGER REFERENCES restaurants(id));

CREATE TABLE deliveryStatus(id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id), partner_id INTEGER REFERENCES delivery_partners(id), delivery_time TIMESTAMP);