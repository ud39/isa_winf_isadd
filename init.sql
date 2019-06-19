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
                    id int generated always as identity primary key,
                    time date,
                    name text,
                    access_fee int,
                    description text
);

CREATE TABLE coffee_shop(
                          id int generated always as identity primary key,
                          name  citext,
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
                          latte_art boolean,
                          seats int,
                          workstation boolean,
                          food text,
                          price_class text,
                          franchise text,
                          unique(name, address)
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
                    description text,
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
  file_name text primary key,
  content_type text
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
                     coffee_shop_id int,
                     vegan boolean,
                     PRIMARY KEY (coffee_drink_name, coffee_shop_id),
                     FOREIGN KEY (coffee_drink_name) REFERENCES coffee_drink(name) ON DELETE CASCADE,
                     FOREIGN KEY (coffee_shop_id) REFERENCES coffee_shop(id) ON DELETE CASCADE
);

CREATE TABLE near_by(
                      coffee_shop_id int,
                      poi_name citext,
                      poi_address address ,
                      PRIMARY KEY (coffee_shop_id, poi_name, poi_address),
                      FOREIGN KEY (poi_address, poi_name) REFERENCES poi (address,name) ON DELETE CASCADE,
                      FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

CREATE TABLE reachable(
                        coffee_shop_id int,
                        bus_station_name citext,
                        PRIMARY KEY (coffee_shop_id, bus_station_name),
                        FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                        FOREIGN KEY (bus_station_name) REFERENCES bus_station (name) ON DELETE CASCADE

);

CREATE TABLE owns (
                    company_name citext ,
                    coffee_shop_id int,
                    PRIMARY KEY(company_name, coffee_shop_id),
                    FOREIGN KEY(company_name) REFERENCES company (name) ON DELETE CASCADE,
                    FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

CREATE TABLE supplies (
                        equipment_category_name citext ,
                        coffee_shop_id int,
                        PRIMARY KEY (equipment_category_name, coffee_shop_id),
                        FOREIGN KEY (equipment_category_name) REFERENCES equipment_category(name) ON DELETE CASCADE ,
                        FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

CREATE TABLE provides (
                        bean_name citext ,
                        bean_manufacturer_name citext,
                        coffee_shop_id int,
                        PRIMARY KEY (bean_name, coffee_shop_id, bean_manufacturer_name),
                        FOREIGN KEY (bean_name, bean_manufacturer_name) REFERENCES bean (name, manufacturer_name) ON DELETE CASCADE,
                        FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
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
                      coffee_shop_id int,
                      PRIMARY KEY (blend_name, blend_manufacturer_name, coffee_shop_id),
                      FOREIGN KEY (blend_manufacturer_name, blend_name) REFERENCES blend(manufacturer_name, name) ON DELETE CASCADE,
                      FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

CREATE TABLE organised_by(
                           coffee_shop_id int,
                           event_id int ,
                           PRIMARY KEY (coffee_shop_id, event_id),
                           FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                           FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
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
                     coffee_shop_id int,
                     close time  ,
                     open time ,
                     weekday text ,
                     PRIMARY KEY (coffee_shop_id, close, open, weekday),
                     FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                     FOREIGN KEY (close, open, weekday) REFERENCES opening_time (close, open, weekday) ON DELETE CASCADE
);

CREATE TABLE includes (
                        coffee_shop_id int,
                        preparation_name citext  ,
                        coffee_drink_name citext  ,
                        PRIMARY KEY (coffee_shop_id, preparation_name, coffee_drink_name),
                        FOREIGN KEY (coffee_drink_name) REFERENCES  coffee_drink (name) ON DELETE CASCADE,
                        FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

CREATE TABLE located (
                       location_address address ,
                       coffee_shop_id int,
                       event_id int,
                       PRIMARY KEY ( location_address, coffee_shop_id, event_id),
                       FOREIGN KEY (location_address) references location (address),
                       FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                       FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE
);

CREATE TABLE sells (
                     equipment_manufacturer citext  ,
                     equipment_year_of_origin int ,
                     equipment_name citext ,
                     equipment_category_name citext  ,
                     coffee_shop_id int,
                     PRIMARY KEY (equipment_year_of_origin, equipment_manufacturer, equipment_name, equipment_category_name, coffee_shop_id),
                     FOREIGN KEY(equipment_manufacturer, equipment_name, equipment_year_of_origin) REFERENCES equipment (manufacturer_name, model_name, year_of_origin) ON DELETE CASCADE,
                     FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

create table coffee_shop_image (
                                 image_file_name text,
                                 coffee_shop_id int,
                                 Primary Key(image_file_name, coffee_shop_id),
                                 Foreign Key(image_file_name) references image (file_name),
                                 FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE);


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
                               coffee_shop_id int,
                               PRIMARY KEY (google_rating_id, coffee_shop_id),
                               FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                               FOREIGN KEY (google_rating_id) REFERENCES google_rating(rating_id) ON DELETE CASCADE
);

CREATE TABLE rated_by_tripadvisor (
                                    tripadvisor_rating_id int ,
                                    coffee_shop_id int,
                                    PRIMARY KEY (tripadvisor_rating_id, coffee_shop_id),
                                    FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                                    FOREIGN KEY (tripadvisor_rating_id) REFERENCES tripadvisor_rating(rating_id) ON DELETE CASCADE
);

CREATE TABLE rated_by_user (
                             user_rating_id int ,
                             coffee_shop_id int,
                             PRIMARY KEY (user_rating_id, coffee_shop_id),
                             FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                             FOREIGN KEY (user_rating_id) REFERENCES user_rating(rating_id) ON DELETE CASCADE
);


CREATE TABLE rates (
                     user_rating_id int ,
                     email citext,
                     coffee_shop_id int,
                     PRIMARY KEY (user_rating_id, email, coffee_shop_id),
                     FOREIGN KEY (user_rating_id, coffee_shop_id) REFERENCES rated_by_user (user_rating_id, coffee_shop_id) ON DELETE CASCADE,
                     FOREIGN KEY (email) REFERENCES public.user (email) ON DELETE CASCADE
);

create table article (
                       article_id int generated always as identity primary key,
                       title text not null,
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

insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, food, price_class) values
('Coffee_shop_Name3', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), false, false, true, 'Textbeschreibung', false, true, 'www.nene.ne', 2019, true, false, 50, false, 'foood', 'niedrig');
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, food, price_class) values
('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), false, false, true, 'Textbeschreibung', false, true, 'www.nene.ne', 2019, true, false, 50, false, 'foood', 'niedrig');

insert into equipment_category values ('Kaffeemühle');
insert into supplies values ('Kaffeemühle', 1);


insert into supplies values ('Kaffeemühle', 2);

insert into coffee_drink values ('coffeedrinkdummyname', 'descriptiondummy');
insert into coffee_drink values ('coffeedrinkdummyname1', 'descriptiondummy1');

insert into serves values ('coffeedrinkdummyname' , 2);
insert into serves values ('coffeedrinkdummyname1' , 2);

insert into poi values ('dummyname' ,('dummystraße', 5, 23222, 'Dummystadt', 'Dummyland'));
insert into poi values ('dummyname1' ,('dummystraß1e', 5, 23222, 'Dummystadt', 'Dummyland'));

insert into near_by values (2, 'dummyname' ,('dummystraße', 5, 23222, 'Dummystadt', 'Dummyland'));
insert into near_by values (2, 'dummyname1' ,('dummystraß1e', 5, 23222, 'Dummystadt', 'Dummyland'));

insert into bus_station values ('stationdummy', 51);
insert into bus_station values ('stationdummy1', 52);

insert into reachable values (2, 'stationdummy');
insert into reachable values (2, 'stationdummy1');

insert into company values ('dummycompany');
insert into company values ('dummycompany1');

insert into owns values ('dummycompany', 2);
insert into owns values ('dummycompany1', 2);

insert into equipment_category values ('categorydummy');
insert into equipment_category values ('categorydummy1');

insert into supplies values ('categorydummy', 2);
insert into supplies values ('categorydummy1', 2);

insert into bean values ('dummybean', 'dummymanufacturer', 'dummyprovenance', true, 'dummytype');
insert into bean values ('dummybean1', 'dummymanufacturer', 'dummyprovenance', true, 'dummytype');

insert into provides values ('dummybean' ,'dummymanufacturer', 2);
insert into provides values ('dummybean1' ,'dummymanufacturer', 2);

insert into blend values ('blenddummy', 'manufacturerdummy', 'dummyprovenance', 'low');
insert into blend values ('blenddummy1', 'manufacturerdummy', 'dummyprovenance', 'high');

insert into offers values ('blenddummy', 'manufacturerdummy', 2);
insert into offers values ('blenddummy1', 'manufacturerdummy', 2);


insert into event (time, name, access_fee, description) values ('2019-12-26', 'dummyevent1', 5, 'eventdescriptiondummy');
insert into event (time, name, access_fee, description) values ('2019-12-25', 'dummyevent', 5, 'eventdescriptiondummy');

insert into organised_by values (2, 1);
insert into organised_by values (2, 2);

insert into opening_time values ('05:00:00', '17:00:00', 'Friday');
insert into opening_time values ('05:00:00', '17:00:00', 'Monday');

insert into image values ('1.png');
insert into image values ('2.png');

insert into coffee_shop_image values ('1.png',1);
insert into coffee_shop_image values ('2.png',2);
insert into coffee_shop_image values ('1.png',2);



--todo: opens etc.