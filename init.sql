------ EXTENTIONS ------

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


------ TYPES -------

CREATE TYPE address AS (
  street_name text,
  street_number int,
  postal_code int,
  town text,
  country text
  );


------- FUNCTIONS ---------

CREATE or REPLACE FUNCTION equal(a1 citext, a address, b1 citext, b address) RETURNS boolean AS $$
BEGIN
  RETURN a.country = b. country and a.town = b.town and  a.postal_code = b.postal_code
    and a.street_name = b.street_name and a.street_number = b.street_number
    and a1 = b1;
END; $$
  LANGUAGE PLPGSQL;

------ ENTITIES ------
CREATE TABLE equipment(
                        model_name citext,
                        manufacturer_name citext,
                        year_of_origin int,
                        PRIMARY KEY (model_name, manufacturer_name, year_of_origin)
);

CREATE TABLE event(
                    event_id int generated always as identity primary key,
                    time date,
                    name text,
                    access_fee int,
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
                          website text,
                          founding_year int,
                          pets_friendly boolean,
                          latte_art boolean, -- todo?
                          seats int,
                          workstation boolean,
                          food text, -- todo array?
                          price_class text,
                          franchise text,
                          PRIMARY KEY (name, address)
);

CREATE TABLE bus_station(
                          name citext primary key,
                          line int
);

CREATE TABLE company(
  name citext primary key
);

CREATE TABLE bean(
                   name citext,
                   manufacturer_name citext,
                   provenance text,
                   fair_trade boolean,
                   type text,
                   PRIMARY KEY (name, manufacturer_name)
);

CREATE TABLE poi(
                  name citext,
                  address address,
                  description text,
                  PRIMARY KEY (name, address)
);

CREATE TABLE blend(
                    name citext,
                    manufacturer_name citext,
                    provenance text,
                    price_range text,
                    PRIMARY KEY (name, manufacturer_name)

);

CREATE TABLE location(
                       address address primary key,
                       description text
);

CREATE TABLE equipment_category(
  name citext primary key
);

CREATE TABLE preparation(
                          name citext primary key,
                          description text,
                          type text
);

CREATE TABLE coffee_drink(
                           name citext primary key,
                           description text
);

CREATE TABLE opening_time(
                           close time,
                           open time,
                           weekday text,
                           PRIMARY KEY (close, open, weekday)
);

CREATE TABLE public.user (
  email citext primary key
);

create table image (
  file_name text primary key
);



------ RELATIONSHIPS ------

CREATE TABLE consists_of(
                          coffee_drink_name citext,
                          bean_manufacturer_name citext,
                          bean_name citext,
                          PRIMARY KEY (coffee_drink_name, bean_manufacturer_name, bean_name),
                          FOREIGN KEY (coffee_drink_name) REFERENCES coffee_drink(name) ON DELETE CASCADE,
                          FOREIGN KEY (bean_manufacturer_name, bean_name) REFERENCES bean (manufacturer_name, name) ON DELETE CASCADE
);

CREATE TABLE serves(
                     coffee_drink_name citext,
                     coffee_shop_name citext,
                     coffee_shop_address address,
                     vegan boolean,
                     PRIMARY KEY (coffee_drink_name, coffee_shop_address, coffee_shop_name),
                     FOREIGN KEY (coffee_drink_name) REFERENCES coffee_drink(name) ON DELETE CASCADE,
                     FOREIGN KEY (coffee_shop_address, coffee_shop_name) REFERENCES coffee_shop(address, name) ON DELETE CASCADE
);

CREATE TABLE near_by(
                      coffee_shop_name  citext,
                      coffee_shop_address address,
                      poi_name citext,
                      poi_address address ,
                      PRIMARY KEY (coffee_shop_address, coffee_shop_name, poi_name, poi_address),
                      FOREIGN KEY (poi_address, poi_name) REFERENCES poi (address,name) ON DELETE CASCADE,
                      FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES  coffee_shop (name, address) ON DELETE CASCADE
);

CREATE TABLE reachable(
                        coffee_shop_name citext,
                        coffee_shop_address address,
                        bus_station_name citext,
                        PRIMARY KEY (coffee_shop_name, coffee_shop_address, bus_station_name),
                        FOREIGN KEY (coffee_shop_address, coffee_shop_name) REFERENCES coffee_shop (address, name) ON DELETE CASCADE,
                        FOREIGN KEY (bus_station_name) REFERENCES bus_station (name) ON DELETE CASCADE

);

CREATE TABLE owns (
                    company_name citext ,
                    coffee_shop_name citext ,
                    coffee_shop_address address ,
                    PRIMARY KEY(company_name, coffee_shop_address, coffee_shop_name),
                    FOREIGN KEY(company_name) REFERENCES company (name) ON DELETE CASCADE,
                    FOREIGN KEY(coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop(name, address) ON DELETE CASCADE
);

CREATE TABLE supplies (
                        equipment_category_name citext ,
                        coffee_shop_name citext ,
                        coffee_shop_address address ,
                        PRIMARY KEY (equipment_category_name, coffee_shop_name, coffee_shop_address),
                        FOREIGN KEY (equipment_category_name) REFERENCES equipment_category(name) ON DELETE CASCADE ,
                        FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop (name, address) ON DELETE CASCADE
);

CREATE TABLE provides (
                        bean_name citext ,
                        bean_manufacturer_name citext,
                        coffee_shop_name citext ,
                        coffee_shop_address address ,
                        PRIMARY KEY (bean_name, coffee_shop_name, coffee_shop_address, bean_manufacturer_name),
                        FOREIGN KEY (bean_name, bean_manufacturer_name) REFERENCES bean (name, manufacturer_name) ON DELETE CASCADE,
                        FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop (name, address) ON DELETE CASCADE
);

CREATE TABLE composed (
                        blend_name citext ,
                        blend_manufacturer_name citext  ,
                        bean_name citext,
                        bean_manufacturer_name citext ,
                        proportion text ,
                        PRIMARY KEY (blend_manufacturer_name, blend_name, bean_name, bean_manufacturer_name),
                        FOREIGN KEY (blend_name, blend_manufacturer_name) REFERENCES blend (name, manufacturer_name) ON DELETE CASCADE,
                        FOREIGN KEY (bean_manufacturer_name, bean_name) REFERENCES bean (manufacturer_name, name) ON DELETE CASCADE
);

CREATE TABLE offers (
                      blend_name citext ,
                      blend_manufacturer_name citext ,
                      coffee_shop_name citext ,
                      coffee_shop_address address ,
                      PRIMARY KEY (blend_name, blend_manufacturer_name, coffee_shop_address, coffee_shop_name),
                      FOREIGN KEY (blend_manufacturer_name, blend_name) REFERENCES blend(manufacturer_name, name) ON DELETE CASCADE,
                      FOREIGN KEY (coffee_shop_name, coffee_shop_address) references coffee_shop (name, address) ON DELETE CASCADE
);

CREATE TABLE organised_by(
                           coffee_shop_name citext  ,
                           coffee_shop_address address  ,
                           event_id int ,
                           PRIMARY KEY (coffee_shop_name, coffee_shop_address, event_id),
                           FOREIGN KEY (coffee_shop_address, coffee_shop_name) REFERENCES coffee_shop (address, name) ON DELETE CASCADE,
                           FOREIGN KEY (event_id) REFERENCES event(event_id) ON DELETE CASCADE
);

CREATE TABLE subcategory (
  equipment_category_name citext primary key REFERENCES equipment_category(name) ON DELETE CASCADE
);

CREATE TABLE coffee_drink_typ (
                                coffee_drink_name citext primary key REFERENCES coffee_drink(name) ON DELETE CASCADE,
                                type text
);

CREATE TABLE belongs_to (
                          equipment_manufacturer_name citext  ,
                          equipment_year_of_origin int,
                          equipment_name citext ,
                          equipment_category_name citext ,
                          PRIMARY KEY (equipment_category_name, equipment_manufacturer_name, equipment_name, equipment_year_of_origin),
                          FOREIGN KEY (equipment_category_name) REFERENCES equipment_category (name) ON DELETE CASCADE,
                          FOREIGN KEY (equipment_manufacturer_name, equipment_name, equipment_year_of_origin) REFERENCES equipment (manufacturer_name, model_name, year_of_origin) ON DELETE CASCADE
);

CREATE TABLE opens (
                     coffee_shop_name citext ,
                     coffee_shop_address address ,
                     close time  ,
                     open time ,
                     weekday text ,
                     PRIMARY KEY (coffee_shop_address, coffee_shop_name, close, open, weekday),
                     FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop (name, address) ON DELETE CASCADE,
                     FOREIGN KEY (close, open, weekday) REFERENCES opening_time (close, open, weekday) ON DELETE CASCADE
);

CREATE TABLE includes (
                        coffee_shop_name citext  ,
                        coffee_shop_address address  ,
                        preparation_name citext  ,
                        coffee_drink_name citext  ,
                        PRIMARY KEY (coffee_shop_name, coffee_shop_address, preparation_name, coffee_drink_name),
                        FOREIGN KEY (coffee_drink_name) REFERENCES  coffee_drink (name) ON DELETE CASCADE,
                        FOREIGN KEY (coffee_shop_address, coffee_shop_name) REFERENCES coffee_shop (address, name) ON DELETE CASCADE
);

CREATE TABLE located (
                       location_address address ,
                       coffee_shop_name citext  ,
                       coffee_shop_address address  ,
                       event_id int,
                       PRIMARY KEY ( location_address, coffee_shop_name, coffee_shop_address, event_id),
                       FOREIGN KEY (location_address) references location (address),
                       FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop (name, address) ON DELETE CASCADE,
                       FOREIGN KEY (event_id) REFERENCES event (event_id) ON DELETE CASCADE
);

CREATE TABLE sells (
                     equipment_manufacturer citext  ,
                     equipment_year_of_origin int ,
                     equipment_name citext ,
                     equipment_category_name citext  ,
                     coffee_shop_name citext ,
                     coffee_shop_address address  ,
                     PRIMARY KEY (equipment_year_of_origin, equipment_manufacturer, equipment_name, equipment_category_name, coffee_shop_name, coffee_shop_address),
                     FOREIGN KEY(equipment_manufacturer, equipment_name, equipment_year_of_origin) REFERENCES equipment (manufacturer_name, model_name, year_of_origin) ON DELETE CASCADE,
                     FOREIGN KEY (coffee_shop_name, coffee_shop_address ) REFERENCES  coffee_shop (name, address) ON DELETE CASCADE
);

create table coffee_shop_image (
                                 image_file_name text,
                                 coffee_shop_name citext,
                                 coffee_shop_address address,
                                 Primary Key(image_file_name, coffee_shop_name, coffee_shop_address),
                                 Foreign Key(image_file_name) references image (file_name),
                                 Foreign Key(coffee_shop_name, coffee_shop_address) references coffee_shop(name, address));


------  CLUSTER  -------

CREATE TABLE google_rating(
                            rating_id int primary key,
                            overall_rating int,
                            count_of_ratings int
);

CREATE TABLE user_rating(
                          rating_id int primary key,
                          rating int
);

CREATE TABLE tripadvisor_rating(
                                 rating_id int primary key,
                                 overall_rating int,
                                 count_of_ratings int
);

CREATE TABLE rated_by_google (
                               google_rating_id int ,
                               coffee_shop_name citext ,
                               coffee_shop_address address ,
                               PRIMARY KEY (google_rating_id, coffee_shop_name, coffee_shop_address),
                               FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop (name, address) ON DELETE CASCADE,
                               FOREIGN KEY (google_rating_id) REFERENCES google_rating(rating_id) ON DELETE CASCADE
);

CREATE TABLE rated_by_tripadvisor (
                                    tripadvisor_rating_id int ,
                                    coffee_shop_name citext ,
                                    coffee_shop_address address ,
                                    PRIMARY KEY (tripadvisor_rating_id, coffee_shop_name, coffee_shop_address),
                                    FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop (name, address) ON DELETE CASCADE,
                                    FOREIGN KEY (tripadvisor_rating_id) REFERENCES tripadvisor_rating(rating_id) ON DELETE CASCADE
);

CREATE TABLE rated_by_user (
                             user_rating_id int ,
                             coffee_shop_name citext ,
                             coffee_shop_address address ,
                             PRIMARY KEY (user_rating_id, coffee_shop_name, coffee_shop_address),
                             FOREIGN KEY (coffee_shop_name, coffee_shop_address) REFERENCES coffee_shop (name, address) ON DELETE CASCADE,
                             FOREIGN KEY (user_rating_id) REFERENCES user_rating(rating_id) ON DELETE CASCADE
);


CREATE TABLE rates (
                     user_rating_id int ,
                     email citext,
                     coffee_shop_name citext ,
                     coffee_shop_address address ,
                     PRIMARY KEY (user_rating_id, email, coffee_shop_name, coffee_shop_address),
                     FOREIGN KEY (user_rating_id, coffee_shop_name, coffee_shop_address) REFERENCES rated_by_user (user_rating_id, coffee_shop_name, coffee_shop_address) ON DELETE CASCADE,
                     FOREIGN KEY (email) REFERENCES public.user (email) ON DELETE CASCADE
);

create table article (
                       article_id int generated always as identity primary key,
                       name text not null,
                       article_type text not null,
                       check(article_type in ('bean', 'coffee_drink', 'equipment', 'blend')),
                       unique (article_id, article_type)
);

create table article_bean (
                            article_id int primary key references article (article_id),
                            article_type text default 'bean',
                            check (article_type = 'bean'),
                            foreign key (article_id, article_type) references article (article_id, article_type) ON DELETE CASCADE,
                            exposition text
);

create table article_coffee_drink (
                                    article_id int primary key references article (article_id),
                                    article_type text default 'coffee_drink',
                                    check (article_type = 'coffee_drink'),
                                    foreign key (article_id, article_type) references article (article_id, article_type) ON DELETE CASCADE,
                                    exposition text
);

create table article_equipment (
                                 article_id int primary key references article (article_id),
                                 article_type text default 'equipment',
                                 check (article_type = 'equipment'),
                                 foreign key (article_id, article_type) references article (article_id, article_type) ON DELETE CASCADE,
                                 exposition text
);

create table article_blend (
                             article_id int primary key references article (article_id),
                             article_type text default 'blend',
                             check (article_type = 'blend'),
                             foreign key (article_id, article_type) references article (article_id, article_type) ON DELETE CASCADE,
                             exposition text
);

create table operates (
                        article_id int REFERENCES article (article_id) ON DELETE CASCADE,
                        email citext REFERENCES public.user (email) ON DELETE CASCADE,
                        time timestamp DEFAULT Now(),
                        operation_type text not null default 'create',
                        check (operation_type in ('create', 'edit', 'publish', 'inactive')),

                        PRIMARY KEY (article_id, email, time)
);


------------ INSERT DATA ----------

insert into coffee_shop values ('Coffee_shop_Name3', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), false, false, true, 'Textbeschreibung', false, true, 'www.nene.ne', 2019, true, false, 50, false, 'foood', 'niedrig');
insert into coffee_shop values ('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), false, false, true, 'Textbeschreibung', false, true, 'www.nene.ne', 2019, true, false, 50, false, 'foood', 'niedrig');
insert into equipment_category values ('Kaffeemühle');
insert into supplies values ('Kaffeemühle', 'Coffee_shop_Name3', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));


insert into supplies values ('Kaffeemühle', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));

insert into coffee_drink values ('coffeedrinkdummyname', 'descriptiondummy');
insert into coffee_drink values ('coffeedrinkdummyname1', 'descriptiondummy1');

insert into serves values ('coffeedrinkdummyname' , 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));
insert into serves values ('coffeedrinkdummyname1' , 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));

insert into poi values ('dummyname' ,('dummystraße', 5, 23222, 'Dummystadt', 'Dummyland'));
insert into poi values ('dummyname1' ,('dummystraß1e', 5, 23222, 'Dummystadt', 'Dummyland'));

insert into near_by values ('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 'dummyname' ,('dummystraße', 5, 23222, 'Dummystadt', 'Dummyland'));
insert into near_by values ('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 'dummyname1' ,('dummystraß1e', 5, 23222, 'Dummystadt', 'Dummyland'));

insert into bus_station values ('stationdummy', 51);
insert into bus_station values ('stationdummy1', 52);

insert into reachable values ('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 'stationdummy');
insert into reachable values ('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 'stationdummy1');

insert into company values ('dummycompany');
insert into company values ('dummycompany1');

insert into owns values ('dummycompany', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));
insert into owns values ('dummycompany1', 'Coffee_shop_Name3', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));

insert into equipment_category values ('categorydummy');
insert into equipment_category values ('categorydummy1');

insert into supplies values ('categorydummy', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));
insert into supplies values ('categorydummy1', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));

insert into bean values ('dummybean', 'dummymanufacturer', 'dummyprovenance', true, 'dummytype');
insert into bean values ('dummybean1', 'dummymanufacturer', 'dummyprovenance', true, 'dummytype');

insert into provides values ('dummybean' ,'dummymanufacturer', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));
insert into provides values ('dummybean1' ,'dummymanufacturer', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));

insert into blend values ('blenddummy', 'manufacturerdummy', 'dummyprovenance', 'low');
insert into blend values ('blenddummy1', 'manufacturerdummy', 'dummyprovenance', 'high');

insert into offers values ('blenddummy', 'manufacturerdummy', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));
insert into offers values ('blenddummy1', 'manufacturerdummy', 'Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'));


insert into event (time, name, access_fee, description) values ('2019-12-26', 'dummyevent1', 5, 'eventdescriptiondummy');
insert into event (time, name, access_fee, description) values ('2019-12-25', 'dummyevent', 5, 'eventdescriptiondummy');

insert into organised_by values ('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 1);
insert into organised_by values ('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 2);

insert into opening_time values ('05:00:00', '17:00:00', 'Friday');
insert into opening_time values ('05:00:00', '17:00:00', 'Monday');

--todo: opens etc.