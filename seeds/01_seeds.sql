-- USERS DATA --
INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Sue Luna', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Rosalie Garza', 'jacksondavid@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- PROPERTIES DATA --
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Speed Lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', '$930.61', 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, 'true');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Blank Corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 85234, 6, 6, 7, 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', 83680 , 'true');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Habit Mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 46058, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland and Labrador', 44583, 'true');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (3, 'Headerd Know', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 82640, 0, 5, 5, 'Canada', '531 Powov Grove', 'Jaebvap', 'Ontario', 38051, 'true');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (4, 'Port Out', 'description', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 2358, 2, 8, 0, 'Canada', '1392 Gaza Junction', 'Upetafpuv', 'Nova Scotia', 81059, 'true');

-- RESERVATIONS DATA --
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 4);
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2019-01-14', '2019-02-01', 4, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-10-01', '2021-10-14', 3, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2014-10-21', '2014-10-21', 5, 5);
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2016-07-17', '2016-08-01', 2, 1);

-- PROPERTY_REVIEWS DATA --
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 1, 1, 3, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 4, 2, 1, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 3, 3, 2, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (5, 5, 4, 5, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 5, 4, 'message');
