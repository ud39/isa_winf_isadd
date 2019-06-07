------ CREATE EXTENTIONS ------

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


------ CREATE TYPES -------
  
CREATE TYPE address AS (
  addressee text,
  street_name text,
  street_number int,
  postal_code int,
  town text,
  country text
  );

------ CREATE ENTITIES ------
CREATE TABLE equipment(
  model_name citext,
  manufacturer_name citext,
  year_of_origin integer,
  PRIMARY KEY (model_name, manufacturer_name, year_of_origin)
);

CREATE TABLE event(
  event_id int generated always as identity,
  time date,
  name text,
  access_fee integer,
  description text
);

CREATE TABLE coffee_shop(
  name citext,
  address address,
  outdoor boolean, 
  fair_trade boolean,
  disabled_friendly boolean,
  description text,
  wlan boolean,
  child_friendly boolean,
  website text, -- todo
  founding_year integer,
  pets_friendly boolean,
  latte_art boolean, -- todo: enum
  seats integer,
  workstation boolean,
  food text, -- todo enum array?
  price_class text, --todo enum
  franchise text,
  PRIMARY KEY (name, address)
);

CREATE TABLE bus_station(
  name citext primary key,
  line integer
);

CREATE TABLE company(
  name citext primary key
);

CREATE TABLE bean(
  name citext,
  manufacturer_name citext,
  provenance text,
  fair_trade boolean,
  type text, --todo
  PRIMARY KEY (name, manufacturer_name)
);

CREATE TABLE poi(
  name citext,
  address address,
  description text,
  PRIMARY KEY (name, address)
);

CREATE TABLE google_rating(

);

CREATE TABLE user_rating(
);

CREATE TABLE tripadvisor_rating(
);

CREATE TABLE blend(
  name citext,
  manufacturer_name citext,
  provenance text,
  price_range integer, --todo
  PRIMARY KEY (name, manufacturer_name)
  
);

CREATE TABLE location(
  address address primary key,
  description text
);

CREATE TABLE equipment_category(
  name citext primary key 
);
CREATE TABLE actor(
  email citext primary key, --todo constraints email?
  actor_name text
 -- password; not here !!!!!!!!!!              
);

CREATE TABLE preparation(
  name citext primary key,
  description text, 
  type text --todo: enum?
);

CREATE TABLE coffee_drink(
  name citext primary key,
  description text
);

CREATE TABLE opening_time( -- ?????
  close time,
  open time,
  weekday text,
  PRIMARY KEY (close, open, weekday)
);

CREATE TABLE user(
  email citext primary key 
);

CREATE TABLE student(
  email citext primary key
);

CREATE TABLE tourist(
  email citext primary key
);

CREATE TABLE fanatic(
  email citext primary key
);

CREATE TABLE admin(
  email citext primary key
);

CREATE TABLE content_manager(
  email citext primary key
);

CREATE TABLE article (
  articleID int generated always as identity
);

------ CREATE RELATIONSHIPS ------

CREATE TABLE consists_of(
  coffee_drink_name citext REFERENCES coffee_drink(name) ,
  bean_manufacturer_name citext REFERENCES bean(manufacturer_name),
  bean_name citext REFERENCES bean (name),
  PRIMARY KEY (coffee_drink_name, bean_manufacturer_name, bean_name)
);

CREATE TABLE serves(
  coffee_drink_name citext REFERENCES coffee_drink(name),
  coffee_shop_address address REFERENCES coffee_shop(address),
  coffee_shop_name citext REFERENCES coffee_shop (name),
  vegan boolean,
  PRIMARY KEY (coffee_drink_name, coffee_shop_address, coffee_shop_name)
);

CREATE TABLE near_by(
  coffee_shop_name  citext REFERENCES coffee_shop (name),
  coffee_shop_address address REFERENCES coffee_shop (address),
  poi_name citext REFERENCES poi (name),
  poi_address text REFERENCES poi (address) ,
  PRIMARY KEY (coffee_shop_address, coffee_shop_name, poi_name, poi_address)
);

CREATE TABLE reachable(
  coffee_shop_name citext REFERENCES coffee_shop(name),
  coffee_shop_address address REFERENCES coffee_shop (address),
  bus_station_name citext REFERENCES bus_station(name),
  PRIMARY KEY ( coffee_shop_name, coffee_shop_address, bus_station_name)
  
);

CREATE TABLE owns (
  company_name citext REFERENCES company(name) ,
  coffee_shop_address address REFERENCES coffee_shop(address),
  coffee_shop_name citext REFERENCES coffee_shop (name),
  PRIMARY KEY(company_name, coffee_shop_address, coffee_shop_name)
);

CREATE TABLE supplies (
  equipment_category_name citext REFERENCES equipment_category(name),
  coffee_shop_name citext REFERENCES coffee_shop (name) ,
  coffee_shop_address address REFERENCES coffee_shop (address),
  PRIMARY KEY (equipment_category_name, coffee_shop_name, coffee_shop_address)
);

CREATE TABLE provides (
  bean_name citext REFERENCES bean (name),
  coffee_shop_name citext REFERENCES coffee_shop (name),
  coffee_shop_address address REFERENCES coffee_shop (address),
  bean_manufacturer_name citext REFERENCES bean (manufacturer_name) 
  
);

CREATE TABLE composed (
  blend_name citext REFERENCES blend (name) ,
  blend_manufacturer_name citext REFERENCES blend (manufacturer_name) ,
  bean_name citext REFERENCES bean (name),
  bean_manufacturer_name citext REFERENCES bean (manufacturer_name),
  proportion text , --todo
  PRIMARY KEY (blend_manufacturer_name, blend_name, bean_name, bean_manufacturer_name)
);

CREATE TABLE offers (
  blend_name citext REFERENCES blend(name) ,
  blend_manufacturer_name citext REFERENCES blend(manufacturer_name) ,
  coffee_shop_name citext REFERENCES coffee_shop(name) ,
  coffee_shop_address address REFERENCES coffee_shop (address) ,
  PRIMARY KEY (blend_name, blend_manufacturer_name, coffee_shop_address, coffee_shop_name)
);

CREATE TABLE organised_by(
  coffee_shop_name citext REFERENCES coffee_shop(name) ,
  coffee_shop_address address REFERENCES coffee_shop (address) ,
  eventID int REFERENCES event(event_id),
  PRIMARY KEY (coffee_shop_name, coffee_shop_address, eventID)
);

CREATE TABLE operator (
  email citext primary key  ---- REFERENCES????
);

CREATE TABLE subcategory (
  equipment_category_name citext primary key REFERENCES equipment_category(name)
);

CREATE TABLE coffee_drink_typ (
  coffee_drink_name citext primary key REFERENCES coffee_drink(name) ,
  type text -- todo: enum?
);

CREATE TABLE belongs_to (
  equipment_manufacturer_name citext REFERENCES equipment (manufacturer_name) ,
  equipment_year_of_origin text REFERENCES equipment (year_of_origin),
  equipment_name citext REFERENCES equipment(model_name),
  equipment_category_name citext REFERENCES equipment_category (name) ,
  PRIMARY KEY (equipment_category_name, equipment_manufacturer_name, equipment_name, equipment_year_of_origin)
);

CREATE TABLE opens (
  coffee_shop_name citext REFERENCES coffee_shop (name) ,
  coffee_shop_address text REFERENCES coffee_shop (address) ,
  close integer REFERENCES opening_time (close) ,
  open integer REFERENCES opening_time (open) ,
  weekday integer REFERENCES opening_time (weekday),
  PRIMARY KEY (coffee_shop_address, coffee_shop_name, close, open, weekday)   
);

CREATE TABLE includes (
  coffee_shop_name citext REFERENCES coffee_shop (name) ,
  coffee_shop_address text REFERENCES coffee_shop (address) ,
  preparation_name citext REFERENCES preparation (name) ,
  coffee_drink_name citext REFERENCES coffee_drink (name) ,
  PRIMARY KEY (coffee_shop_name, coffee_shop_address, preparation_name, coffee_drink_name)
);

CREATE TABLE rated_by (
  rating_id int REFERENCES rates (ratingID),
  coffee_shop_name citext REFERENCES coffee_shop (name),
  coffee_shop_address REFERENCES coffee_shop (address),
  PRIMARY KEY (rating_id, coffee_shop_name, coffee_shop_address)
);

CREATE TABLE located (
  location_address address REFERENCES location (address),
  coffee_shop_name citext REFERENCES coffee_shop (name) ,
  coffee_shop_address address REFERENCES coffee_shop (address) ,
  event_id int REFERENCES event (event_id),
  PRIMARY KEY ( location_address, coffee_shop_name, coffee_shop_address, event_id)
);

CREATE TABLE sells (
  equipment_manufacturer citext REFERENCES equipment (manufacturer_name) ,
  equipment_year_of_origin text REFERENCES equipment (year_of_origin),
  equipment_name citext REFERENCES equipment (model_name),
  equipment_category_name citext REFERENCES equipment_category (name) ,
  coffee_shop_name citext REFERENCES coffee_shop (name) ,
  coffee_shop_address address  REFERENCES coffee_shop (address) ,
  PRIMARY KEY ( equipment_year_of_origin, equipment_manufacturer, equipment_name, equipment_category_name, coffee_shop_name, coffee_shop_address)
);

CREATE TABLE creates (
  email citext primary key ,
  articleID int primary key ,
  PRIMARY KEY (email, articleID)
);

CREATE TABLE publishes (
  email citext primary key ,
  articleID int primary key ,
  PRIMARY KEY (email, articleID)
);

CREATE TABLE rates (
  ratingID int primary key,
  email citext primary key,
  coffee_shop_name citext primary key,
  coffee_shop_address address primary key,
  PRIMARY KEY (ratingID, email, coffee_shop_name, coffee_shop_address)
);





-- Dummy-data
CREATE TABLE customer
(
  name text,
  email citext,
  phone text,
  address text,
  id serial
);
INSERT INTO CUSTOMER (name, email, phone) VALUES ('Blabla', 'bla@gmail.com', '4545555');
INSERT INTO CUSTOMER (name, email, phone) VALUES ('Alice', 'Cooper@gmail.com', '1112');


