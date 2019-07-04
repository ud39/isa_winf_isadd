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

CREATE or REPLACE FUNCTION equal(a address, b address) RETURNS boolean AS $$
BEGIN
  RETURN a.country = b. country and a.town = b.town and  a.postal_code = b.postal_code
    and a.street_name = b.street_name and a.street_number = b.street_number;
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
                    start_time date,
                    end_time date,
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
                          warm_food boolean,
                          cold_food boolean,
                          price_class text,
                          franchise text,
                          unique(name, address)
);



CREATE TABLE company(
  name citext primary key
);

CREATE TABLE bean(
                   name citext,
                   provenance citext,
                   roast text,
                   grind text,
                   PRIMARY KEY (name, provenance)
);

CREATE TABLE manufacturer(
                           name citext,
                           PRIMARY KEY (name)
);

CREATE TABLE poi(
                  name citext,
                  address address,
                  description text,
                  PRIMARY KEY (name, address)
);

CREATE TABLE blend(
                    name citext,
                    provenance text,
                    price_class text,
                    PRIMARY KEY (name)
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
                           description text,
                           type citext
);



CREATE TABLE public.user (
  email citext primary key
);

create table image (
                     file_name text primary key,
                     content_type text,
                     unique (file_name, content_type)
);



------ RELATIONSHIPS ------

CREATE TABLE consists_of(
                          coffee_drink_name citext,
                          bean_name citext,
                          bean_provenance citext,
                          PRIMARY KEY (coffee_drink_name, bean_name),
                          FOREIGN KEY (coffee_drink_name) REFERENCES coffee_drink(name) ON DELETE CASCADE,
                          FOREIGN KEY (bean_name, bean_provenance) REFERENCES bean (name, provenance) ON DELETE CASCADE
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

CREATE TABLE reachable_by_bus(
                               coffee_shop_id int,
                               bus_station_name citext,
                               bus_station_line citext,
                               PRIMARY KEY (coffee_shop_id, bus_station_name, bus_station_line),
                               FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE

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
                        bean_provenance citext,
                        coffee_shop_id int,
                        PRIMARY KEY (bean_name, coffee_shop_id),
                        FOREIGN KEY (bean_name, bean_provenance) REFERENCES bean (name, provenance) ON DELETE CASCADE,
                        FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

CREATE TABLE produce (
                       bean_name citext,
                       bean_provenance citext,
                       manufacturer_name citext,
                       roasting text,
                       product_name text,
                       fair_trade boolean,
                       price_class text,
                       PRIMARY KEY (bean_name, bean_provenance, manufacturer_name),
                       FOREIGN KEY (bean_name, bean_provenance) REFERENCES bean (name, provenance) ON DELETE CASCADE,
                       FOREIGN KEY (manufacturer_name) REFERENCES manufacturer (name) ON DELETE CASCADE
);



CREATE TABLE composed (
                        blend_name citext ,
                        bean_name citext  ,
                        bean_provenance citext,
                        manufacturer_name citext,
                        PRIMARY KEY (blend_name,bean_name, bean_provenance, manufacturer_name),
                        FOREIGN KEY (blend_name) REFERENCES blend (name) ON DELETE CASCADE,
                        FOREIGN KEY (bean_name, bean_provenance) REFERENCES bean (name, provenance) ON DELETE CASCADE,
                        FOREIGN KEY (manufacturer_name) REFERENCES manufacturer (name) ON DELETE CASCADE
);

CREATE TABLE composed_essential (
                        blend_name citext ,
                        bean_name citext  ,
                        bean_provenance citext,
                        PRIMARY KEY (blend_name, bean_name, bean_provenance),
                        FOREIGN KEY (blend_name) REFERENCES blend (name) ON DELETE CASCADE,
                        FOREIGN KEY (bean_name, bean_provenance) REFERENCES bean (name, provenance) ON DELETE CASCADE
);

CREATE TABLE offers (
                      blend_name citext ,
                      coffee_shop_id int,
                      PRIMARY KEY (blend_name, coffee_shop_id),
                      FOREIGN KEY (blend_name) REFERENCES blend(name) ON DELETE CASCADE,
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



CREATE TABLE belongs_to (
                          equipment_manufacturer_name citext  ,
                          equipment_year_of_origin int,
                          equipment_model_name citext ,
                          equipment_category_name citext ,
                          PRIMARY KEY (equipment_category_name, equipment_manufacturer_name, equipment_model_name, equipment_year_of_origin),
                          FOREIGN KEY (equipment_category_name) REFERENCES equipment_category (name) ON DELETE CASCADE,
                          FOREIGN KEY (equipment_manufacturer_name, equipment_model_name, equipment_year_of_origin) REFERENCES equipment (manufacturer_name, model_name, year_of_origin) ON DELETE CASCADE
);

CREATE TABLE opens (
                     coffee_shop_id int,
                     close time  ,
                     open time ,
                     weekday text ,
                     PRIMARY KEY (coffee_shop_id, close, open, weekday),
                     FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
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
                       FOREIGN KEY (location_address) references location (address) ON DELETE CASCADE,
                       FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE,
                       FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE
);

CREATE TABLE sells (
                     equipment_manufacturer_name citext  ,
                     equipment_year_of_origin int ,
                     equipment_model_name citext ,
                     equipment_category_name citext  ,
                     coffee_shop_id int,
                     PRIMARY KEY (equipment_year_of_origin, equipment_manufacturer_name, equipment_model_name, equipment_category_name, coffee_shop_id),
                     FOREIGN KEY(equipment_manufacturer_name, equipment_model_name, equipment_year_of_origin) REFERENCES equipment (manufacturer_name, model_name, year_of_origin) ON DELETE CASCADE,
                     FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE
);

create table coffee_shop_image (
                                 image_file_name text,
                                 coffee_shop_id int,
                                 Primary Key(image_file_name, coffee_shop_id),
                                 UNIQUE (image_file_name),
                                 Foreign Key(image_file_name) references image (file_name) ON DELETE CASCADE,
                                 FOREIGN KEY (coffee_shop_id) REFERENCES  coffee_shop (id) ON DELETE CASCADE);

create table event_image (
                           image_file_name text,
                           event_id int,
                           Primary Key(image_file_name, event_id),
                           Foreign Key(image_file_name) references image (file_name) ON DELETE CASCADE,
                           FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE);


create table poi_image (
                         image_file_name text,
                         poi_name citext,
                         poi_address address,
                         Primary Key(image_file_name, poi_name, poi_address),
                         Foreign Key(image_file_name) references image (file_name) ON DELETE CASCADE,
                         FOREIGN KEY (poi_name, poi_address) REFERENCES  poi (name, address) ON DELETE CASCADE);

create table bean_image (
                          image_file_name text,
                          bean_name citext,
                          bean_provenance citext,
                          Primary Key(image_file_name, bean_name, bean_provenance),
                          Foreign Key(image_file_name) references image (file_name) ON DELETE CASCADE,
                          FOREIGN KEY (bean_name, bean_provenance) REFERENCES  bean (name, provenance) ON DELETE CASCADE);

create table blend_image (
                           image_file_name text,
                           blend_name citext,
                           Primary Key(image_file_name, blend_name),
                           Foreign Key(image_file_name) references image (file_name) ON DELETE CASCADE,
                           FOREIGN KEY (blend_name) REFERENCES  blend (name) ON DELETE CASCADE);

create table equipment_category_image (
                                        image_file_name text,
                                        equipment_category_name citext,
                                        Primary Key(image_file_name, equipment_category_name),
                                        Foreign Key(image_file_name) references image (file_name) ON DELETE CASCADE,
                                        FOREIGN KEY (equipment_category_name) REFERENCES  equipment_category (name) ON DELETE CASCADE);




------  CLUSTER  -------

CREATE TABLE google_rating(
                            rating_id int generated always as identity primary key,
                            overall_rating int,
                            count_of_ratings int
);

CREATE TABLE user_rating(
                          rating_id int generated always as identity primary key,
                          total int,
                          coffee_selection int,
                          feelgood_factor int,
                          service int,
                          facilities int

);

CREATE TABLE tripadvisor_rating(
                                 rating_id int generated always as identity primary key,
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







------------ TRIGGER ----------


CREATE OR REPLACE FUNCTION delete_obsolete_events_trigger_function() RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS(SELECT *  FROM organised_by WHERE event_id = OLD.event_id ) THEN
        RETURN NEW;
         ELSE
          DELETE FROM event  WHERE id = OLD.event_id;
          RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_obsolete_image_trigger_function() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM image WHERE file_name = OLD.image_file_name;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



DROP TRIGGER IF EXISTS delete_obsolete_events on organised_by;
CREATE TRIGGER delete_obsolete_events AFTER DELETE ON organised_by FOR EACH ROW EXECUTE PROCEDURE delete_obsolete_events_trigger_function();

DROP TRIGGER IF EXISTS delete_obsolete_images on event_image;
CREATE TRIGGER delete_obsolete_images AFTER DELETE ON event_image FOR EACH ROW EXECUTE PROCEDURE delete_obsolete_image_trigger_function();
