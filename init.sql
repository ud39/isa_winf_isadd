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

CREATE TABLE image (
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


CREATE SCHEMA dbo
  -- Table: dbo."IdentityUser"
  CREATE TABLE dbo."IdentityUser"
  (
    "UserName" character varying(256) NOT NULL,
    "Email" character varying(256) NOT NULL,
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text,
    "SecurityStamp" character varying(38),
    "PhoneNumber" character varying(50),
    "PhoneNumberConfirmed" boolean,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" timestamp without time zone,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer NOT NULL,
    "Id" serial NOT NULL,
    CONSTRAINT "PK_IdentityUser" PRIMARY KEY ("Id")
  )
    WITH (
      OIDS=FALSE
    );

-- Table: dbo."IdentityRole"

CREATE TABLE dbo."IdentityRole"
(
  "Id" serial NOT NULL,
  "Name" character varying(50) NOT NULL,
  CONSTRAINT "IdentityRole_pkey" PRIMARY KEY ("Id")
)
  WITH (
    OIDS=FALSE
  );

-- Table: dbo."IdentityLogin"

CREATE TABLE dbo."IdentityLogin"
(
  "LoginProvider" character varying(256) NOT NULL,
  "ProviderKey" character varying(128) NOT NULL,
  "UserId" integer NOT NULL,
  "Name" character varying(256) NOT NULL,
  CONSTRAINT "IdentityLogin_pkey" PRIMARY KEY ("LoginProvider", "ProviderKey", "UserId"),
  CONSTRAINT "IdentityLogin_UserId_fkey" FOREIGN KEY ("UserId")
    REFERENCES dbo."IdentityUser" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
)
  WITH (
    OIDS=FALSE
  );

-- Table: dbo."IdentityUserClaim"

CREATE TABLE dbo."IdentityUserClaim"
(
  "Id" serial NOT NULL,
  "UserId" integer NOT NULL,
  "ClaimType" character varying(256) NOT NULL,
  "ClaimValue" character varying(256) NOT NULL,
  CONSTRAINT "IdentityUserClaim_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT "IdentityUserClaim_UserId_fkey" FOREIGN KEY ("UserId")
    REFERENCES dbo."IdentityUser" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
)
  WITH (
    OIDS=FALSE
  );

-- Table: dbo."IdentityUserRole"

CREATE TABLE dbo."IdentityUserRole"
(
  "UserId" integer NOT NULL,
  "RoleId" integer NOT NULL,
  CONSTRAINT "IdentityUserRole_pkey" PRIMARY KEY ("UserId", "RoleId"),
  CONSTRAINT "IdentityUserRole_RoleId_fkey" FOREIGN KEY ("RoleId")
    REFERENCES dbo."IdentityRole" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "IdentityUserRole_UserId_fkey" FOREIGN KEY ("UserId")
    REFERENCES dbo."IdentityUser" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE
)
  WITH (
    OIDS=FALSE
  );

CREATE TABLE dbo."IdentityRoleClaim"
(
  "Id" serial NOT NULL,
  "RoleId" integer NOT NULL,
  "ClaimType" character varying(256) NOT NULL,
  "ClaimValue" character varying(256),
  CONSTRAINT "IdentityRoleClaim_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT "IdentityRoleClaim_RoleId_fkey" FOREIGN KEY ("RoleId")
    REFERENCES dbo."IdentityRole" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
)
  WITH (
    OIDS=FALSE
  );


insert into dbo."IdentityRole" values ('0', 'admin');
insert into dbo."IdentityRole" values ('1', 'contentmanager');
insert into dbo."IdentityRole" values ('2', 'user');

INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user1@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user2@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user3@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user4@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user5@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user6@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user7@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user8@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user9@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user10@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user11@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user11@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user12@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user13@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user14@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user15@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user16@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user17@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user18@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);

insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'The Fuller Brush Man Café', ('Old Shore Straße',44,24867,'München','Germany'), true, false, true, 'Ut at dolor quis odio consequat varius.', false, false, 'phoca.cz', 1992, false, false, null, true, false, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Private Fears in Public Places (Coeurs) Café', ('Jana Straße',100,24232,'Berlin','Germany'), false, true, true, 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.', true, true, 'youtu.be', 1994, true, true, 7, true, true, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Perfect Score, The Café', ('Gerald Straße',41,24319,'Hannover','Germany'), true, true, false, 'Duis ac nibh.', false, true, 'so-net.ne.jp', 2004, true, false, 88, true, true, false, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'History of Future Folk, The Café', ('Kings Straße',23,26716,'Bremerhaven','Germany'), false, true, false, 'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.', true, true, 'networksolutions.com', 1991, true, null, 66, true, true, true, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Shameless (Maskeblomstfamilien ) Café', ('Prairie Rose Straße',14,22903,'Erfurt','Germany'), true, true, false, 'Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.', false, true, 'canalblog.com', 2005, false, true, 57, false, true, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Stealth Rösterei & Café', ('Dunning Straße',66,25298,'Essen','Germany'), true, false, false, 'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.', true, true, 'blogtalkradio.com', 2002, true, null, 32, false, true, false, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Cheech & Chong''s Nice Dreams Café', ('Welch Straße',40,21259,'Essen','Germany'), true, false, true, 'In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', false, true, 'amazonaws.com', 2001, true, true, 60, true, false, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Whiplash Rösterei & Café', ('Melvin Straße',36,23602,'Bonn','Germany'), false, false, false, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.', false, false, 'indiegogo.com', 2012, true, false, 100, true, false, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Hunting Party, The Café', ('Fremont Straße',41,23417,'Hanau','Germany'), true, false, true, 'Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', true, false, 'last.fm', 2012, true, true, 72, false, true, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Leo''s Room (Cuarto de Leo, El) Café', ('Surrey Straße',62,23793,'Rostock','Germany'), true, false, true, 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.', true, true, '163.com', 1995, true, true, 73, false, false, true, 'mittel', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Falling in Love Again Café', ('Carberry Straße',18,23146,'Hamburg','Germany'), true, false, false, 'Phasellus sit amet erat. Nulla tempus.', true, false, 'wiley.com', 1997, true, true, 66, true, false, false, 'mittel', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Pain & Gain Rösterei & Café', ('Jenifer Straße',31,26778,'München','Germany'), false, false, true, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.', false, true, 'army.mil', 1992, false, true, null, true, false, false, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Populaire Café', ('Browning Straße',14,25773,'Mainz','Germany'), true, true, true, 'Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.', true, false, 'census.gov', 2005, false, false, 17, true, true, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Striptease Café', ('Sunnyside Straße',64,26369,'Hamburg Sankt Pauli','Germany'), true, true, true, 'In congue.', null, null, 'free.fr', 2001, null, false, null, true, false, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Fantastic Four Café', ('Armistice Straße',5,25154,'Wuppertal','Germany'), false, false, true, 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.', true, false, 'redcross.org', 2004, false, true, 41, false, false, true, 'mittel', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Devil Bat, The Café', ('Grover Straße',63,24867,'Münster','Germany'), false, false, true, 'Praesent blandit. Nam nulla.', true, false, 'histats.com', 2003, false, false, 85, false, false, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Captain Blood Rösterei & Café', ('Columbus Straße',21,22104,'Frankfurt am Main','Germany'), false, true, false, 'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', true, false, 'dell.com', 1999, true, false, 83, false, true, false, 'mittel', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Straight Talk Café', ('Pawling Straße',80,23014,'Hamburg','Germany'), true, false, false, 'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.', false, false, 'columbia.edu', 2001, false, false, 10, true, true, true, 'mittel', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Russia''s Toughest Prisons (National Geographic) Café', ('New Castle Straße',72,24455,'Essen','Germany'), true, true, false, 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.', null, null, 'deviantart.com', 2010, null, false, 43, true, true, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Last Unicorn, The Café', ('Coleman Straße',62,22676,'Berlin','Germany'), false, false, false, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', false, false, 'apple.com', 1993, true, null, 50, false, true, false, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Up the Down Staircase Café', ('Kensington Straße',40,21124,'Hamburg','Germany'), false, false, true, 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', false, true, 'weibo.com', 2010, true, true, 76, false, false, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Pandora and the Flying Dutchman Café', ('Stephen Straße',15,24724,'Berlin','Germany'), false, false, true, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', false, true, 'economist.com', 2008, true, true, 64, true, true, true, 'mittel', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Fallout Rösterei & Café', ('Cascade Straße',91,23522,'Bremen','Germany'), false, false, false, 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.', true, false, 'storify.com', 1996, false, true, 49, false, false, false, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'You Only Live Twice Café', ('Dixon Straße',47,23898,'Hamburg Bramfeld','Germany'), false, false, true, 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.', false, true, 'kickstarter.com', 2006, true, false, 5, false, true, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Sting II, The Café', ('Waubesa Straße',67,25789,'Lübeck','Germany'), true, false, false, 'Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.', false, false, 'nationalgeographic.com', 2012, false, true, 90, false, false, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Girl by the Lake, The (La ragazza del lago) Café', ('Anhalt Straße',56,23252,'Stuttgart','Germany'), true, true, true, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.', false, true, 'etsy.com', 2007, true, false, 1, true, false, true, 'mittel', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Narco Cultura Café', ('Holmberg Straße',92,26452,'Erfurt','Germany'), true, false, false, 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.', false, true, 'github.io', 1985, true, true, 23, true, true, true, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Stepford Wives, The Café', ('Independence Straße',69,22048,'Köln','Germany'), true, true, true, 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', true, true, 'purevolume.com', 2003, true, true, 38, false, false, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Trio, The (Trio, Das) Café', ('Bartelt Straße',3,23011,'Bonn','Germany'), true, true, false, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.', false, false, 'redcross.org', 1987, true, false, 29, false, false, false, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( '7 Dollars on the Red (Sette dollari sul rosso) Café', ('Delladonna Straße',15,21293,'Magdeburg','Germany'), true, false, false, 'Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', false, false, 'sciencedirect.com', 2011, true, false, 52, false, false, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Fiancee, The (Parineeta) Café', ('Corscot Straße',62,21665,'Kiel','Germany'), false, true, false, 'Maecenas tincidunt lacus at velit.', false, false, 'zdnet.com', 2006, true, null, 80, true, false, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Boiler Room Café', ('Division Straße',7,26937,'Bremerhaven','Germany'), true, false, false, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.', false, true, 'purevolume.com', 2001, false, false, 81, false, true, false, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Circle of Deceit (Die Fälschung) Café', ('Morrow Straße',72,22425,'Duisburg','Germany'), true, true, false, 'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', true, false, 'opera.com', 1992, true, true, 1, true, true, false, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Atlas Shrugged: Who Is John Galt? (Atlas Shrugged: Part III) Café', ('Prentice Straße',53,23491,'Braunschweig','Germany'), true, false, true, 'Maecenas leo odio, condimentum luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', false, false, 'shareasale.com', 1989, true, null, 83, false, true, false, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Last Man, The Café', ('Hermina Straße',20,21708,'Düsseldorf','Germany'), false, true, false, 'Nulla ut erat id mauris vulputate elementum. Nullam varius.', true, true, 'yale.edu', 1999, true, true, 100, false, false, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Gospel, The Café', ('Delladonna Straße',95,26236,'Wiesbaden','Germany'), false, true, true, 'Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.', true, false, 'irs.gov', 1996, false, null, 20, true, false, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Shining Through Café', ('Scofield Straße',23,21219,'Bremen','Germany'), false, false, true, 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', false, false, 'vimeo.com', 2009, true, true, null, true, true, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Tales from the Gimli Hospital Café', ('7th Straße',99,24443,'Remscheid','Germany'), false, true, true, 'Suspendisse potenti.', false, true, 'sina.com.cn', 2007, false, true, 73, false, false, false, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Cost of Living, The (Le coût de la vie) Café', ('Petterle Straße',99,22229,'Berlin','Germany'), true, false, false, 'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', false, false, 'webnode.com', 1990, false, false, 71, true, false, false, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Disclosure Café', ('Stang Straße',74,22551,'Mülheim an der Ruhr','Germany'), false, false, true, 'Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', true, true, 'gizmodo.com', 2008, false, false, 3, true, false, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Romeo and Juliet Café', ('Mcbride Straße',53,26706,'Berlin','Germany'), false, false, true, 'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', true, true, 'imgur.com', 2003, false, true, 48, false, true, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Dredd Café', ('Swallow Straße',81,23127,'Düsseldorf','Germany'), true, true, false, 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', true, true, 'seesaa.net', 2010, true, false, 16, true, false, false, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Hit and Run (Hit & Run) Café', ('Emmet Straße',88,25041,'Saarbrücken','Germany'), false, true, false, 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.', true, false, 'soup.io', 1994, false, true, 10, false, true, true, 'mittel', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Dreams of  a Life Café', ('Buena Vista Straße',68,22024,'Leipzig','Germany'), false, true, true, 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', true, false, 'geocities.jp', 1996, false, false, 48, true, true, true, 'mittel', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Girl on the Train, The Café', ('Scoville Straße',41,22344,'Braunschweig','Germany'), false, true, false, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', false, false, 'paypal.com', 1999, true, true, 76, false, true, false, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Blame (6 Films to Keep You Awake) (Películas para no dormir: La culpa) Café', ('Park Meadow Straße',72,21283,'Düsseldorf','Germany'), true, true, false, 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', true, true, 'cnn.com', 2012, false, null, null, false, false, false, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Curious George Café', ('Vidon Straße',100,25213,'München','Germany'), false, false, true, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', false, true, 'yelp.com', 2006, true, false, 5, false, false, false, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Wild Animals (Yasaeng dongmul bohoguyeog) Café', ('Thompson Straße',18,23669,'Essen','Germany'), false, false, false, 'Proin leo odio, porttitor consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.', true, false, 'economist.com', 2001, false, true, 99, false, true, true, 'hoch', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Flaming Creatures Café', ('Anzinger Straße',92,21697,'Wetzlar','Germany'), false, true, true, 'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.', false, true, 'ucoz.ru', 1992, false, true, 46, true, true, true, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Ararat Café', ('Katie Straße',36,23763,'Bielefeld','Germany'), true, false, true, 'Nullam molestie nibh in lectus. Pellentesque at nulla.', true, true, 'fc2.com', 2001, false, false, 41, false, true, true, 'niedrig', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Callas Forever Café', ('Di Loreto Straße',45,22122,'Essen','Germany'), false, false, true, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.', false, true, 'mlb.com', 2006, false, false, 55, false, false, false, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Kites Café', ('Westport Straße',50,25088,'Berlin','Germany'), false, false, true, 'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor consequat in, consequat ut, nulla.', false, false, 'nifty.com', 1997, true, false, 39, true, true, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Unsuspected, The Café', ('Dakota Straße',17,22109,'Frankfurt am Main','Germany'), false, true, false, 'Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', true, false, 'woothemes.com', 2012, true, false, 38, true, true, true, 'hoch', true);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'Pride Café', ('Gulseth Straße',57,21229,'Osnabrück','Germany'), false, true, false, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', false, false, 'webnode.com', 2007, false, false, 42, true, true, true, 'niedrig', false);
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class, franchise) values ( 'House of the Devil Rösterei & Café', ('Loftsgordon Straße',77,26878,'Hamburg','Germany'), false, true, false, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', null, null, 'examiner.com', 1992, null, true, 91, false, true, false, 'hoch', false);



insert into bean (name, provenance, roast, grind) values ('Arusha', 'Brazil', 'raw', 'veryFine');
insert into bean (name, provenance, roast, grind) values ('Benguet', 'Indonesia', 'dark roasted','veryFine');
insert into bean (name, provenance, roast, grind) values ('Blue Mountain', 'Indonesia', 'raw','veryCoarse');
insert into bean (name, provenance, roast, grind) values ('Bourbon', 'Mexico', 'roasted','middle');
insert into bean (name, provenance, roast, grind) values ('Catuai', 'Indonesia', 'raw','middle');
insert into bean (name, provenance, roast, grind) values ('Charrier', 'Indonesia', 'dark roasted','coarse');
insert into bean (name, provenance, roast, grind) values ('Colombian', 'Indonesia', 'raw','fine');
insert into bean (name, provenance, roast, grind) values ('Gesha', 'Honduras', 'roasted','veryFine');
insert into bean (name, provenance, roast, grind) values ('Java', 'Indonesia', 'raw','veryFine');
insert into bean (name, provenance, roast, grind) values ('K7', 'Indonesia', 'raw','none');
insert into bean (name, provenance, roast, grind) values ('Mocha', 'Indonesia', 'raw','none');
insert into bean (name, provenance, roast, grind) values ('Pacas', 'Brazil', 'raw','middle');
insert into bean (name, provenance, roast, grind) values ('Ruiru 11', 'Indonesia', 'raw','none');
insert into bean (name, provenance, roast, grind) values ('S795', 'Brazil', 'raw','coarse');
insert into bean (name, provenance, roast, grind) values ('Sagada', 'Colombia', 'raw','coarse');
insert into bean (name, provenance, roast, grind) values ('Santos', 'Brazil', 'raw','fine');
insert into bean (name, provenance, roast, grind) values ('Sarchimor', 'Ethiopia', 'dark roasted','coarse');
insert into bean (name, provenance, roast, grind) values ('Selection 9 ', 'Indonesia', 'medium roasted','coarse');
insert into bean (name, provenance, roast, grind) values ('SL28', 'Indonesia', 'raw','coarseMiddle');
insert into bean (name, provenance, roast, grind) values ('Sulawesi', 'Colombia', 'medium roasted','coarseMiddle');
insert into bean (name, provenance, roast, grind) values ('Timor, Arabusta', 'Indonesia', 'raw','coarse');
insert into bean (name, provenance, roast, grind) values ('Typica', 'Indonesia', 'roasted','middle');
insert into bean (name, provenance, roast, grind) values ('Uganda', 'Colombia', 'raw','veryFine');
insert into bean (name, provenance, roast, grind) values ('Brutte', 'Indonesia', 'roasted','coarse');
insert into bean (name, provenance, roast, grind) values ('Catimor', 'Vietnam', 'medium roasted','veryFine');
insert into bean (name, provenance, roast, grind) values ('Caturra', 'Indonesia', 'raw','coarseMiddle');
insert into bean (name, provenance, roast, grind) values ('Ethiopian Harar', 'Indonesia', 'raw','middle');
insert into bean (name, provenance, roast, grind) values ('French Mission', 'Mexico', 'raw','fine');
insert into bean (name, provenance, roast, grind) values ('Hawaiian Kona', 'Brazil', 'raw','middle');
insert into bean (name, provenance, roast, grind) values ('Maragogipe', 'Mexico', 'medium roasted','none');


insert into blend (name, provenance, price_class) values ('Varanus albigularis', 'Brazil', '');
insert into blend (name, provenance, price_class) values ('Blend Superspecial', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Chlamydosaurus kingii', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Lycaon pictus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Sceloporus magister', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Phasianus colchicus', 'Brazil', '');
insert into blend (name, provenance, price_class) values ('Ramphastos tucanus', 'Honduras', '');
insert into blend (name, provenance, price_class) values ('Laniaurius atrococcineus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Hymenolaimus malacorhynchus', 'Honduras', '');
insert into blend (name, provenance, price_class) values ('Macaca fuscata', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Balearica pavonina', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Hystrix indica', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Larus dominicanus', 'Brazil', '');
insert into blend (name, provenance, price_class) values ('Felis silvestris lybica', 'Brazil', '');
insert into blend (name, provenance, price_class) values ('Bliebla', 'Colombia', '');
insert into blend (name, provenance, price_class) values ('Axis axis', 'Vietnam', '');
insert into blend (name, provenance, price_class) values ('Bettongia penicillata', 'Mexico', '');
insert into blend (name, provenance, price_class) values ('Bos taurus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Acinynox jubatus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Oryx gazella callotis', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Phylurus milli', 'Mexico', '');
insert into blend (name, provenance, price_class) values ('Tamiasciurus hudsonicus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Tamandua tetradactyla', 'Brazil', '');
insert into blend (name, provenance, price_class) values ('Alouatta seniculus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Nannopterum harrisi', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Phaethon aethereus', 'Brazil', '');
insert into blend (name, provenance, price_class) values ('Thalasseus maximus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Ninox superciliaris', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Crotalus adamanteus', 'Indonesia', '');
insert into blend (name, provenance, price_class) values ('Amblyrhynchus cristatus', 'Indonesia', '');


insert into company (name) values ('Skajo');
insert into company (name) values ('Yakitri');
insert into company (name) values ('Jabbertype');
insert into company (name) values ('Kimia');
insert into company (name) values ('Zooxo');
insert into company (name) values ('Agivu');
insert into company (name) values ('Innojam');
insert into company (name) values ('Thoughtstorm');
insert into company (name) values ('Yodo');
insert into company (name) values ('Izio');
insert into company (name) values ('Linkbuzz');
insert into company (name) values ('Mynte');
insert into company (name) values ('Jamia');
insert into company (name) values ('Flipopia');
insert into company (name) values ('Ainyx');
insert into company (name) values ('Youspan');
insert into company (name) values ('Linkbridge');
insert into company (name) values ('Shufflebeat');
insert into company (name) values ('Photobug');
insert into company (name) values ('Tagchat');
insert into company (name) values ('Tagfeed');
insert into company (name) values ('Livefish');
insert into company (name) values ('Yata');
insert into company (name) values ('Dabshots');
insert into company (name) values ('Linklinks');
insert into company (name) values ('Teklist');
insert into company (name) values ('Podcat');
insert into company (name) values ('Abatz');
insert into company (name) values ('Yotz');
insert into company (name) values ('Skimia');
insert into company (name) values ('Bluejam');
insert into company (name) values ('Buzzshare');
insert into company (name) values ('Jabberstorm');
insert into company (name) values ('Cogidoo');
insert into company (name) values ('Voolia');
insert into company (name) values ('Kayveo');
insert into company (name) values ('Meevee');
insert into company (name) values ('Divanoodle');



insert into equipment_category (name) values ('Reinigung & Pflege');
insert into equipment_category (name) values ('Souvenirs');
insert into equipment_category (name) values ('Handfilter');
insert into equipment_category (name) values ('Kaffeekannen');
insert into equipment_category (name) values ('Kaffeemaschinen');
insert into equipment_category (name) values ('Aero Press');
insert into equipment_category (name) values ('French Press');
insert into equipment_category (name) values ('Kaffeemühlen');
insert into equipment_category (name) values ('Brühsieb');



insert into event (start_time, end_time, name, access_fee, description) values ('2019-11-03', '2019-11-09', 'Brückenfestival', 9, 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-09-22', '2019-09-24', 'GLOCKENSOMMER-FESTIVAL', 1, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-11-12', '2019-11-15', 'Semesterkonzert, Collegium Musicum der CAU zu Kiel', 6, 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-10-03', '2019-10-09', 'Konzert & Kaffeeklatsch', 2, 'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-15', '2019-07-20' , 'Mittagskonzert - 30 Minuten Musik im Bach-Saal', 8, 'Vestibulum sed magna at nunc commodo placerat. Praesent blandit.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-10-11', '2019-10-18' , 'Open Air Kino: Stadt – Land – Meer', 1, 'Pellentesque viverra pede ac diam.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-08', '2019-08-10'  , 'Gastspiel im ICK-Punkt: Szenenexpress und Tante Salzmann', 7, 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-11-14', '2019-11-18' , 'Semesterkonzert des Akademischen Chors der CAU', 7, 'Donec semper sapien a libero.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-10-10', '2019-10-12' , 'Kiel Puro Reggaeton Open Air Festival 2019', 2, 'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-20', '2019-08-23'  , 'CSD Kiel Demonstration 2019', 5, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-22', '2019-08-27' , 'Lalafestival 2019', 6, 'Morbi ut odio.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-11-02', '2019-11-08'  , 'Forward Festival', 5, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-18', '2019-07-21'  , 'SUP Festival', 8, 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-07', '2019-08-08' , 'Duckstein-Festival', 10, 'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-09-22', '2019-09-26'  , 'KIDS Festival', 6, 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-14', '2019-08-17'  , 'Schleswig-Holstein Musik Festival: Evgeny Kissin (Klavier)', 10, 'Etiam pretium iaculis justo. In hac habitasse platea dictumst.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-10-11', '2019-10-17'  , 'Die halbe Stunde: Violine solo', 5, 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-10', '2019-07-12'  , 'Käse trifft Wein', 3, 'Duis consequat dui nec nisi volutpat eleifend.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-09', '2019-08-13' , '21. Stadtwerke Eisfestival', 7, 'Nulla ut erat id mauris vulputate elementum. Nullam varius.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-09-28', '2019-09-29'  , 'Flashdance – Das Musical', 9, 'Nunc nisl.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-10-25', '2019-10-28'  , '126. Kieler Woche', 7, 'Suspendisse potenti.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-23', '2019-07-26'  , '14. Internationale Willer Balloon Sail', 6, 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-09-23', '2019-09-29'  , 'NDR Elbphilharmonie Orchester', 4, 'Proin interdum mauris non ligula pellentesque ultrices.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-16', '2019-07-22'  , 'Kieler Bootshafensommer', 5, 'Suspendisse potenti. Nullam porttitor lacus at turpis.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-10', '2019-07-16'  , 'Schleswig-Holstein Musik Festival: LaBrassBanda', 10, 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-11-05', '2019-11-12' , 'KN Förde Triathlon', 9, 'Nunc rhoncus dui vel sem. Sed sagittis.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-11', '2019-07-13'  , 'Tag des Sports', 7, 'Suspendisse potenti.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-22', '2019-07-24' , 'Kiel.Lauf', 6, 'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-10-17', '2019-10-23'  , '7. Holtenauer Seifenkistenrennen', 10, 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-07-31', '2019-08-02'  , '1. Philharmonisches Konzert', 1, 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-11-11', '2019-11-16'  , 'Nacht der Wissenschaft', 6, 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-28', '2019-08-29'  , 'One Night of Queen', 4, 'In sagittis dui vel nisl. Duis ac nibh.');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-08-31', '2019-09-01' , '1. Musikalische Matinee', 4, 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');


insert into location (address, description) values (('Westend Straße',61,23730,'Berlin','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Lillian Straße',34,23832,'München','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Mcguire Straße',77,22853,'Wuppertal','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Lakeland Straße',60,21310,'Hamburg','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Bunting Straße',7,21848,'Dortmund','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Sage Straße',86,25781,'Frankfurt am Main','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Maywood Straße',45,24184,'Augsburg','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Aberg Straße',89,23700,'Berlin','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Westerfield Straße',91,25940,'Hamburg','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Ridgeway Straße',45,21814,'Berlin','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Little Fleur Straße',55,24014,'Dresden','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Harper Straße',27,24640,'Rostock','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Kenwood Straße',97,26137,'Hamburg','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Sutherland Straße',24,22920,'München','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Monica Straße',5,23535,'Offenbach','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Golden Leaf Straße',96,24256,'Freiburg im Breisgau','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Katie Straße',14,22305,'Kiel','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Mccormick Straße',40,21324,'Münster','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Canary Straße',99,25123,'Hamburg','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Arapahoe Straße',11,22932,'Berlin','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Ridgeview Straße',17,23187,'Dortmund','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Michigan Straße',15,25764,'Hamburg','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Linden Straße',66,22613,'Berlin','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Oneill Straße',29,22437,'München','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Johnson Straße',3,25549,'Berlin','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('4th Straße',72,25797,'Frankfurt am Main','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Basil Straße',43,21216,'Braunschweig','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Bunker Hill Straße',33,22970,'Wiesbaden','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Birchwood Straße',18,24614,'Dortmund','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Schiller Straße',9,25311,'Würzburg','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Morrow Straße',76,26925,'Wuppertal','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Bunker Hill Straße',83,25578,'Frankfurt am Main','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into location (address, description) values (('Meadow Vale Straße',90,23004,'Berlin','Germany'), 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');


insert into poi (name, address, description) values ('Levensauer Hochbrücke', ('Dixon Straße',59,24435,'Köln','Germany'), 'Etiam pretium iaculis justo.');
insert into poi (name, address, description) values ('Universität Kiel', ('Kipling Straße',39,21143,'Mönchengladbach','Germany'), 'Nullam sit amet turpis elementum ligula vehicula consequat.');
insert into poi (name, address, description) values ('Tiergehege Tannenberg', ('Gulseth Straße',80,24747,'Hamburg Sankt Pauli','Germany'), 'In sagittis dui vel nisl. Duis ac nibh.');
insert into poi (name, address, description) values ('Jakobikirche Kiel', ('Summer Ridge Straße',17,25347,'Gelsenkirchen','Germany'), 'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.');
insert into poi (name, address, description) values ('Schrevenpark', ('8th Straße',26,21414,'Bremen','Germany'), 'Sed ante. Vivamus tortor.');
insert into poi (name, address, description) values ('Eider Anlegestelle', ('Nobel Straße',100,26715,'Hamburg','Germany'), 'Nullam molestie nibh in lectus.');
insert into poi (name, address, description) values ('Platz der Kieler Matrosen', ('Ruskin Straße',15,26637,'Bochum','Germany'), 'Aenean lectus. Pellentesque eget nunc.');
insert into poi (name, address, description) values ('St. Nikolai', ('Bonner Straße',64,21937,'Nürnberg','Germany'), 'Etiam pretium iaculis justo.');
insert into poi (name, address, description) values ('Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'), 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.');
insert into poi (name, address, description) values ('Marineviertel', ('Dawn Straße',29,22489,'Bielefeld','Germany'), 'Duis mattis egestas metus.');
insert into poi (name, address, description) values ('Aquarium GEOMAR', ('Vidon Straße',16,21226,'Erfurt','Germany'), 'Sed accumsan felis. Ut at dolor quis odio consequat varius.');
insert into poi (name, address, description) values ('Hörn', ('Eastlawn Straße',10,24724,'Freiburg im Breisgau','Germany'), 'Phasellus in felis. Donec semper sapien a libero.');
insert into poi (name, address, description) values ('Casino Kiel', ('Harbort Straße',42,25063,'Nürnberg','Germany'), 'Praesent lectus.');
insert into poi (name, address, description) values ('Segelschiff Thor Heyerdahl', ('Almo Straße',82,22510,'Frankfurt am Main','Germany'), 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.');
insert into poi (name, address, description) values ('Leuchtturm Friedrichsort', ('Loomis Straße',87,24890,'Hamburg','Germany'), 'Pellentesque viverra pede ac diam.');
insert into poi (name, address, description) values ('Schilksee Strandbad', ('Boyd Straße',34,25403,'Hamburg','Germany'), 'Nulla justo.');
insert into poi (name, address, description) values ('Museum Eckernförde', ('Jay Straße',10,23022,'Essen','Germany'), 'Aenean fermentum.');
insert into poi (name, address, description) values ('Neumünster Zoo', ('Schiller Straße',42,23645,'Neuss','Germany'), 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.');
insert into poi (name, address, description) values ('Plöner Schloss', ('Cody Straße',100,26304,'Braunschweig','Germany'), 'Curabitur gravida nisi at nibh.');
insert into poi (name, address, description) values ('Familien-Freizeitpark Tolk-Schau', ('Hanson Straße',67,26936,'Leipzig','Germany'), 'Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.');
insert into poi (name, address, description) values ('Kiel Rathausplatz', ('Maple Wood Straße',41,26328,'München','Germany'), 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.');
insert into poi (name, address, description) values ('Hauptbahnhof', ('Randy Straße',6,23409,'Mainz','Germany'), 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.');
insert into poi (name, address, description) values ('Landtag Schleswig-Holstein', ('Johnson Straße',9,26045,'Rostock','Germany'), 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.');
insert into poi (name, address, description) values ('Marine-Ehrenmal Laboe', ('Luster Straße',3,21745,'Wetzlar','Germany'), 'Aliquam non mauris.');
insert into poi (name, address, description) values ('Skulptur "Licht wird Objekt"', ('Browning Straße',30,24885,'Braunschweig','Germany'), 'Morbi quis tortor id nulla ultrices aliquet.');
insert into poi (name, address, description) values ('Denkmal Zar Peter III', ('Ridgeway Straße',45,23321,'München','Germany'), 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.');
insert into poi (name, address, description) values ('Bismarck Denkmal', ('Bultman Straße',27,25133,'Hamburg','Germany'), 'Vestibulum sed magna at nunc commodo placerat. Praesent blandit.');
insert into poi (name, address, description) values ('Kriegerdenkmal Schlossgarten', ('Pleasure Straße',61,23508,'Hamburg','Germany'), 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.');


insert into coffee_drink (name, description, type) values ('Espresso', 'Nulla mollis molestie lorem. Quisque ut erat.', '');
insert into coffee_drink (name, description, type) values ('Macchiato', 'Suspendisse potenti. In eleifend quam a odio.', '');
insert into coffee_drink (name, description, type) values ('Cappuccino', 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '');
insert into coffee_drink (name, description, type) values ('Ristretto', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.', '');
insert into coffee_drink (name, description, type) values ('Caffè shakerato', 'Aenean sit amet justo. Morbi ut odio.', '');
insert into coffee_drink (name, description, type) values ('Latte Macchiato', 'Vivamus tortor.', '');
insert into coffee_drink (name, description, type) values ('Caffè corretto', 'Nulla justo.', '');
insert into coffee_drink (name, description, type) values ('Bicerin', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.', '');
insert into coffee_drink (name, description, type) values ('Caffè Latte', 'Etiam vel augue. Vestibulum rutrum rutrum neque.', '');
insert into coffee_drink (name, description, type) values ('Milchkaffee ', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.', '');
insert into coffee_drink (name, description, type) values ('Eiskaffee', 'Integer tincidunt ante vel ipsum.', '');
insert into coffee_drink (name, description, type) values ('Pharisäer', 'Pellentesque ultrices mattis odio.', '');
insert into coffee_drink (name, description, type) values ('Café noir', 'Quisque ut erat. Curabitur gravida nisi at nibh.', '');
insert into coffee_drink (name, description, type) values ('Irish Coffee', 'Proin risus. Praesent lectus.', '');
insert into coffee_drink (name, description, type) values ('Americano', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.', '');
insert into coffee_drink (name, description, type) values ('Doppelmokka', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '');
insert into coffee_drink (name, description, type) values ('Katerkaffee', 'Nulla ac enim.', '');
insert into coffee_drink (name, description, type) values ('Othello', 'Phasellus in felis.', '');
insert into coffee_drink (name, description, type) values ('Zarenkaffee', 'Suspendisse potenti.', '');
insert into coffee_drink (name, description, type) values ('Türkischer Kaffee', 'Suspendisse potenti.', '');
insert into coffee_drink (name, description, type) values ('Flat White', 'Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.', '');

insert into located (location_address, coffee_shop_id, event_id) values (('Westend Straße',61,23730,'Berlin','Germany'), 41, 1);
insert into located (location_address, coffee_shop_id, event_id) values (('Lillian Straße',34,23832,'München','Germany'), 27, 2);
insert into located (location_address, coffee_shop_id, event_id) values (('Mcguire Straße',77,22853,'Wuppertal','Germany'), 42, 3);
insert into located (location_address, coffee_shop_id, event_id) values (('Lakeland Straße',60,21310,'Hamburg','Germany'), 19, 4);
insert into located (location_address, coffee_shop_id, event_id) values (('Bunting Straße',7,21848,'Dortmund','Germany'), 48, 5);
insert into located (location_address, coffee_shop_id, event_id) values (('Sage Straße',86,25781,'Frankfurt am Main','Germany'), 13, 6);
insert into located (location_address, coffee_shop_id, event_id) values (('Maywood Straße',45,24184,'Augsburg','Germany'), 17, 7);
insert into located (location_address, coffee_shop_id, event_id) values (('Aberg Straße',89,23700,'Berlin','Germany'), 23, 8);
insert into located (location_address, coffee_shop_id, event_id) values (('Westerfield Straße',91,25940,'Hamburg','Germany'), 24, 9);
insert into located (location_address, coffee_shop_id, event_id) values (('Ridgeway Straße',45,21814,'Berlin','Germany'), 27, 10);
insert into located (location_address, coffee_shop_id, event_id) values (('Harper Straße',27,24640,'Rostock','Germany'), 19, 12);
insert into located (location_address, coffee_shop_id, event_id) values (('Kenwood Straße',97,26137,'Hamburg','Germany'), 30, 13);
insert into located (location_address, coffee_shop_id, event_id) values (('Sutherland Straße',24,22920,'München','Germany'), 44, 14);
insert into located (location_address, coffee_shop_id, event_id) values (('Monica Straße',5,23535,'Offenbach','Germany'), 43, 15);
insert into located (location_address, coffee_shop_id, event_id) values (('Golden Leaf Straße',96,24256,'Freiburg im Breisgau','Germany'), 45, 16);
insert into located (location_address, coffee_shop_id, event_id) values (('Katie Straße',14,22305,'Kiel','Germany'), 6, 17);
insert into located (location_address, coffee_shop_id, event_id) values (('Mccormick Straße',40,21324,'Münster','Germany'), 49, 18);
insert into located (location_address, coffee_shop_id, event_id) values (('Canary Straße',99,25123,'Hamburg','Germany'), 18, 19);
insert into located (location_address, coffee_shop_id, event_id) values (('Arapahoe Straße',11,22932,'Berlin','Germany'), 42, 20);
insert into located (location_address, coffee_shop_id, event_id) values (('Ridgeview Straße',17,23187,'Dortmund','Germany'), 9, 21);
insert into located (location_address, coffee_shop_id, event_id) values (('Michigan Straße',15,25764,'Hamburg','Germany'), 8, 22);
insert into located (location_address, coffee_shop_id, event_id) values (('Linden Straße',66,22613,'Berlin','Germany'), 37, 23);
insert into located (location_address, coffee_shop_id, event_id) values (('Oneill Straße',29,22437,'München','Germany'), 23, 24);
insert into located (location_address, coffee_shop_id, event_id) values (('Johnson Straße',3,25549,'Berlin','Germany'), 44, 25);
insert into located (location_address, coffee_shop_id, event_id) values (('4th Straße',72,25797,'Frankfurt am Main','Germany'), 30, 26);
insert into located (location_address, coffee_shop_id, event_id) values (('Basil Straße',43,21216,'Braunschweig','Germany'), 39, 27);
insert into located (location_address, coffee_shop_id, event_id) values (('Bunker Hill Straße',33,22970,'Wiesbaden','Germany'), 8, 28);
insert into located (location_address, coffee_shop_id, event_id) values (('Birchwood Straße',18,24614,'Dortmund','Germany'), 49, 29);
insert into located (location_address, coffee_shop_id, event_id) values (('Schiller Straße',9,25311,'Würzburg','Germany'), 22, 30);
insert into located (location_address, coffee_shop_id, event_id) values (('Morrow Straße',76,26925,'Wuppertal','Germany'), 16, 31);
insert into located (location_address, coffee_shop_id, event_id) values (('Bunker Hill Straße',83,25578,'Frankfurt am Main','Germany'), 27, 32);
insert into located (location_address, coffee_shop_id, event_id) values (('Meadow Vale Straße',90,23004,'Berlin','Germany'), 49, 33);
insert into located (location_address, coffee_shop_id, event_id) values (('Meadow Vale Straße',90,23004,'Berlin','Germany'), 2, 33);
insert into located (location_address, coffee_shop_id, event_id) values (('Little Fleur Straße',55,24014,'Dresden','Germany'), 2, 11);
insert into located (location_address, coffee_shop_id, event_id) values (('Harper Straße',27,24640,'Rostock','Germany'), 2, 12);
insert into located (location_address, coffee_shop_id, event_id) values (('Kenwood Straße',97,26137,'Hamburg','Germany'), 2, 13);
insert into located (location_address, coffee_shop_id, event_id) values (('Sutherland Straße',24,22920,'München','Germany'), 2, 14);


insert into offers (blend_name, coffee_shop_id) values ('Varanus albigularis', 1);
insert into offers (blend_name, coffee_shop_id) values ('Blend Superspecial', 1);
insert into offers (blend_name, coffee_shop_id) values ('Chlamydosaurus kingii', 1);
insert into offers (blend_name, coffee_shop_id) values ('Chlamydosaurus kingii', 5);
insert into offers (blend_name, coffee_shop_id) values ('Chlamydosaurus kingii', 6);
insert into offers (blend_name, coffee_shop_id) values ('Chlamydosaurus kingii', 7);
insert into offers (blend_name, coffee_shop_id) values ('Chlamydosaurus kingii', 8);
insert into offers (blend_name, coffee_shop_id) values ('Chlamydosaurus kingii', 9);
insert into offers (blend_name, coffee_shop_id) values ('Chlamydosaurus kingii', 10);
insert into offers (blend_name, coffee_shop_id) values ('Lycaon pictus', 1);
insert into offers (blend_name, coffee_shop_id) values ('Sceloporus magister', 6);
insert into offers (blend_name, coffee_shop_id) values ('Phasianus colchicus', 6);
insert into offers (blend_name, coffee_shop_id) values ('Ramphastos tucanus', 6);
insert into offers (blend_name, coffee_shop_id) values ('Laniaurius atrococcineus', 5);
insert into offers (blend_name, coffee_shop_id) values ('Hymenolaimus malacorhynchus', 5);
insert into offers (blend_name, coffee_shop_id) values ('Macaca fuscata', 5);
insert into offers (blend_name, coffee_shop_id) values ('Balearica pavonina', 5);
insert into offers (blend_name, coffee_shop_id) values ('Hystrix indica', 5);
insert into offers (blend_name, coffee_shop_id) values ('Larus dominicanus', 8);
insert into offers (blend_name, coffee_shop_id) values ('Felis silvestris lybica', 8);
insert into offers (blend_name, coffee_shop_id) values ('Axis axis', 8);
insert into offers (blend_name, coffee_shop_id) values ('Bettongia penicillata', 8);
insert into offers (blend_name, coffee_shop_id) values ('Bos taurus', 8);
insert into offers (blend_name, coffee_shop_id) values ('Acinynox jubatus', 8);
insert into offers (blend_name, coffee_shop_id) values ('Oryx gazella callotis', 8);
insert into offers (blend_name, coffee_shop_id) values ('Phylurus milli', 8);
insert into offers (blend_name, coffee_shop_id) values ('Tamiasciurus hudsonicus', 8);
insert into offers (blend_name, coffee_shop_id) values ('Tamandua tetradactyla', 9);
insert into offers (blend_name, coffee_shop_id) values ('Alouatta seniculus', 9);
insert into offers (blend_name, coffee_shop_id) values ('Nannopterum harrisi', 9);
insert into offers (blend_name, coffee_shop_id) values ('Phaethon aethereus', 9);
insert into offers (blend_name, coffee_shop_id) values ('Thalasseus maximus', 10);
insert into offers (blend_name, coffee_shop_id) values ('Ninox superciliaris', 10);
insert into offers (blend_name, coffee_shop_id) values ('Crotalus adamanteus', 11);
insert into offers (blend_name, coffee_shop_id) values ('Amblyrhynchus cristatus', 20);
insert into offers (blend_name, coffee_shop_id) values ('Varanus albigularis', 7);
insert into offers (blend_name, coffee_shop_id) values ('Bliebla', 7);
insert into offers (blend_name, coffee_shop_id) values ('Lycaon pictus', 7);
insert into offers (blend_name, coffee_shop_id) values ('Sceloporus magister', 7);
insert into offers (blend_name, coffee_shop_id) values ('Phasianus colchicus', 7);
insert into offers (blend_name, coffee_shop_id) values ('Ramphastos tucanus', 7);
insert into offers (blend_name, coffee_shop_id) values ('Laniaurius atrococcineus', 7);
insert into offers (blend_name, coffee_shop_id) values ('Hymenolaimus malacorhynchus', 7);
insert into offers (blend_name, coffee_shop_id) values ('Macaca fuscata', 7);
insert into offers (blend_name, coffee_shop_id) values ('Balearica pavonina', 7);
insert into offers (blend_name, coffee_shop_id) values ('Hystrix indica', 7);
insert into offers (blend_name, coffee_shop_id) values ('Larus dominicanus', 7);
insert into offers (blend_name, coffee_shop_id) values ('Felis silvestris lybica', 23);
insert into offers (blend_name, coffee_shop_id) values ('Axis axis', 2);
insert into offers (blend_name, coffee_shop_id) values ('Bettongia penicillata', 1);
insert into offers (blend_name, coffee_shop_id) values ('Bos taurus', 1);
insert into offers (blend_name, coffee_shop_id) values ('Acinynox jubatus', 1);
insert into offers (blend_name, coffee_shop_id) values ('Oryx gazella callotis', 1);
insert into offers (blend_name, coffee_shop_id) values ('Phylurus milli', 5);
insert into offers (blend_name, coffee_shop_id) values ('Tamiasciurus hudsonicus', 5);
insert into offers (blend_name, coffee_shop_id) values ('Tamandua tetradactyla', 5);
insert into offers (blend_name, coffee_shop_id) values ('Alouatta seniculus', 5);
insert into offers (blend_name, coffee_shop_id) values ('Nannopterum harrisi', 5);
insert into offers (blend_name, coffee_shop_id) values ('Phaethon aethereus', 5);
insert into offers (blend_name, coffee_shop_id) values ('Thalasseus maximus', 6);
insert into offers (blend_name, coffee_shop_id) values ('Ninox superciliaris', 6);
insert into offers (blend_name, coffee_shop_id) values ('Crotalus adamanteus', 6);
insert into offers (blend_name, coffee_shop_id) values ('Amblyrhynchus cristatus', 6);
insert into offers (blend_name, coffee_shop_id) values ('Tamiasciurus hudsonicus', 2);
insert into offers (blend_name, coffee_shop_id) values ('Tamandua tetradactyla', 2);
insert into offers (blend_name, coffee_shop_id) values ('Alouatta seniculus', 2);
insert into offers (blend_name, coffee_shop_id) values ('Nannopterum harrisi', 2);
insert into offers (blend_name, coffee_shop_id) values ('Phaethon aethereus', 2);
insert into offers (blend_name, coffee_shop_id) values ('Thalasseus maximus', 2);
insert into offers (blend_name, coffee_shop_id) values ('Ninox superciliaris', 2);
insert into offers (blend_name, coffee_shop_id) values ('Crotalus adamanteus', 2);
insert into offers (blend_name, coffee_shop_id) values ('Amblyrhynchus cristatus', 2);


insert into organised_by (coffee_shop_id, event_id) values (41, 1);
insert into organised_by (coffee_shop_id, event_id) values (27, 2);
insert into organised_by (coffee_shop_id, event_id) values (42, 3);
insert into organised_by (coffee_shop_id, event_id) values (19, 4);
insert into organised_by (coffee_shop_id, event_id) values (48, 5);
insert into organised_by (coffee_shop_id, event_id) values (13, 6);
insert into organised_by (coffee_shop_id, event_id) values (17, 7);
insert into organised_by (coffee_shop_id, event_id) values (23, 8);
insert into organised_by (coffee_shop_id, event_id) values (24, 9);
insert into organised_by (coffee_shop_id, event_id) values (27, 10);
insert into organised_by (coffee_shop_id, event_id) values (2, 11);
insert into organised_by (coffee_shop_id, event_id) values (19, 12);
insert into organised_by (coffee_shop_id, event_id) values (30, 13);
insert into organised_by (coffee_shop_id, event_id) values (44, 14);
insert into organised_by (coffee_shop_id, event_id) values (43, 15);
insert into organised_by (coffee_shop_id, event_id) values (45, 16);
insert into organised_by (coffee_shop_id, event_id) values (6, 17);
insert into organised_by (coffee_shop_id, event_id) values (49, 18);
insert into organised_by (coffee_shop_id, event_id) values (18, 19);
insert into organised_by (coffee_shop_id, event_id) values (42, 20);
insert into organised_by (coffee_shop_id, event_id) values (9, 21);
insert into organised_by (coffee_shop_id, event_id) values (8, 22);
insert into organised_by (coffee_shop_id, event_id) values (37, 23);
insert into organised_by (coffee_shop_id, event_id) values (23, 24);
insert into organised_by (coffee_shop_id, event_id) values (44, 25);
insert into organised_by (coffee_shop_id, event_id) values (30, 26);
insert into organised_by (coffee_shop_id, event_id) values (39, 27);
insert into organised_by (coffee_shop_id, event_id) values (8, 28);
insert into organised_by (coffee_shop_id, event_id) values (49, 29);
insert into organised_by (coffee_shop_id, event_id) values (22, 30);
insert into organised_by (coffee_shop_id, event_id) values (16, 31);
insert into organised_by (coffee_shop_id, event_id) values (27, 32);
insert into organised_by (coffee_shop_id, event_id) values (49, 33);
insert into organised_by (coffee_shop_id, event_id) values (14, 12);
insert into organised_by (coffee_shop_id, event_id) values (48, 32);
insert into organised_by (coffee_shop_id, event_id) values (5, 21);
insert into organised_by (coffee_shop_id, event_id) values (38, 27);
insert into organised_by (coffee_shop_id, event_id) values (47, 1);
insert into organised_by (coffee_shop_id, event_id) values (21, 16);
insert into organised_by (coffee_shop_id, event_id) values (39, 25);
insert into organised_by (coffee_shop_id, event_id) values (34, 23);
insert into organised_by (coffee_shop_id, event_id) values (20, 32);
insert into organised_by (coffee_shop_id, event_id) values (30, 25);
insert into organised_by (coffee_shop_id, event_id) values (39, 9);
insert into organised_by (coffee_shop_id, event_id) values (39, 28);
insert into organised_by (coffee_shop_id, event_id) values (17, 27);
insert into organised_by (coffee_shop_id, event_id) values (43, 23);
insert into organised_by (coffee_shop_id, event_id) values (13, 28);
insert into organised_by (coffee_shop_id, event_id) values (23, 16);
insert into organised_by (coffee_shop_id, event_id) values (44, 24);
insert into organised_by (coffee_shop_id, event_id) values (38, 20);
insert into organised_by (coffee_shop_id, event_id) values (29, 6);
insert into organised_by (coffee_shop_id, event_id) values (31, 15);
insert into organised_by (coffee_shop_id, event_id) values (2, 23);
insert into organised_by (coffee_shop_id, event_id) values (2, 28);
insert into organised_by (coffee_shop_id, event_id) values (2, 16);
insert into organised_by (coffee_shop_id, event_id) values (2, 24);
insert into organised_by (coffee_shop_id, event_id) values (2, 20);
insert into organised_by (coffee_shop_id, event_id) values (2, 6);
insert into organised_by (coffee_shop_id, event_id) values (2, 15);



insert into owns (company_name, coffee_shop_id) values ('Skajo', 1);
insert into owns (company_name, coffee_shop_id) values ('Yakitri', 2);
insert into owns (company_name, coffee_shop_id) values ('Jabbertype', 3);
insert into owns (company_name, coffee_shop_id) values ('Kimia', 4);
insert into owns (company_name, coffee_shop_id) values ('Zooxo', 5);
insert into owns (company_name, coffee_shop_id) values ('Agivu', 6);
insert into owns (company_name, coffee_shop_id) values ('Innojam', 7);
insert into owns (company_name, coffee_shop_id) values ('Thoughtstorm', 8);
insert into owns (company_name, coffee_shop_id) values ('Yodo', 9);
insert into owns (company_name, coffee_shop_id) values ('Izio', 10);
insert into owns (company_name, coffee_shop_id) values ('Linkbuzz', 11);
insert into owns (company_name, coffee_shop_id) values ('Mynte', 12);
insert into owns (company_name, coffee_shop_id) values ('Jamia', 13);
insert into owns (company_name, coffee_shop_id) values ('Flipopia', 14);
insert into owns (company_name, coffee_shop_id) values ('Ainyx', 15);
insert into owns (company_name, coffee_shop_id) values ('Youspan', 16);
insert into owns (company_name, coffee_shop_id) values ('Linkbridge', 17);
insert into owns (company_name, coffee_shop_id) values ('Shufflebeat', 18);
insert into owns (company_name, coffee_shop_id) values ('Photobug', 19);
insert into owns (company_name, coffee_shop_id) values ('Tagchat', 20);
insert into owns (company_name, coffee_shop_id) values ('Tagfeed', 21);
insert into owns (company_name, coffee_shop_id) values ('Livefish', 22);
insert into owns (company_name, coffee_shop_id) values ('Yata', 23);
insert into owns (company_name, coffee_shop_id) values ('Dabshots', 24);
insert into owns (company_name, coffee_shop_id) values ('Linklinks', 25);
insert into owns (company_name, coffee_shop_id) values ('Teklist', 26);
insert into owns (company_name, coffee_shop_id) values ('Podcat', 27);
insert into owns (company_name, coffee_shop_id) values ('Abatz', 28);
insert into owns (company_name, coffee_shop_id) values ('Yotz', 29);
insert into owns (company_name, coffee_shop_id) values ('Skimia', 30);
insert into owns (company_name, coffee_shop_id) values ('Bluejam', 31);
insert into owns (company_name, coffee_shop_id) values ('Buzzshare', 32);
insert into owns (company_name, coffee_shop_id) values ('Jabberstorm', 33);
insert into owns (company_name, coffee_shop_id) values ('Cogidoo', 34);
insert into owns (company_name, coffee_shop_id) values ('Bluejam', 35);
insert into owns (company_name, coffee_shop_id) values ('Voolia', 36);
insert into owns (company_name, coffee_shop_id) values ('Kayveo', 37);
insert into owns (company_name, coffee_shop_id) values ('Meevee', 38);
insert into owns (company_name, coffee_shop_id) values ('Divanoodle', 39);
insert into owns (company_name, coffee_shop_id) values ('Meevee', 40);
insert into owns (company_name, coffee_shop_id) values ('Abatz', 41);
insert into owns (company_name, coffee_shop_id) values ('Yotz', 42);
insert into owns (company_name, coffee_shop_id) values ('Skimia', 43);
insert into owns (company_name, coffee_shop_id) values ('Bluejam', 44);
insert into owns (company_name, coffee_shop_id) values ('Buzzshare', 45);
insert into owns (company_name, coffee_shop_id) values ('Jabberstorm', 46);
insert into owns (company_name, coffee_shop_id) values ('Cogidoo', 47);
insert into owns (company_name, coffee_shop_id) values ('Bluejam', 48);
insert into owns (company_name, coffee_shop_id) values ('Voolia', 49);
insert into owns (company_name, coffee_shop_id) values ('Kayveo', 50);
insert into owns (company_name, coffee_shop_id) values ('Meevee', 51);
insert into owns (company_name, coffee_shop_id) values ('Divanoodle', 52);
insert into owns (company_name, coffee_shop_id) values ('Meevee', 53);
insert into owns (company_name, coffee_shop_id) values ('Divanoodle', 54);
insert into owns (company_name, coffee_shop_id) values ('Meevee', 55);

insert into near_by (coffee_shop_id, poi_name, poi_address) values (1 ,'Levensauer Hochbrücke', ('Dixon Straße',59,24435,'Köln','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (2 ,'Universität Kiel', ('Kipling Straße',39,21143,'Mönchengladbach','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (3 ,'Tiergehege Tannenberg', ('Gulseth Straße',80,24747,'Hamburg Sankt Pauli','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (4 ,'Jakobikirche Kiel', ('Summer Ridge Straße',17,25347,'Gelsenkirchen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (5 ,'Schrevenpark', ('8th Straße',26,21414,'Bremen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (6 ,'Eider Anlegestelle', ('Nobel Straße',100,26715,'Hamburg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (7 ,'Platz der Kieler Matrosen', ('Ruskin Straße',15,26637,'Bochum','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (8 ,'St. Nikolai', ('Bonner Straße',64,21937,'Nürnberg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (9 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (10 ,'Marineviertel', ('Dawn Straße',29,22489,'Bielefeld','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (11 ,'Aquarium GEOMAR', ('Vidon Straße',16,21226,'Erfurt','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (12 ,'Hörn', ('Eastlawn Straße',10,24724,'Freiburg im Breisgau','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (13 ,'Casino Kiel', ('Harbort Straße',42,25063,'Nürnberg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (14 ,'Segelschiff Thor Heyerdahl', ('Almo Straße',82,22510,'Frankfurt am Main','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (15 ,'Leuchtturm Friedrichsort', ('Loomis Straße',87,24890,'Hamburg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (16 ,'Schilksee Strandbad', ('Boyd Straße',34,25403,'Hamburg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (17 ,'Museum Eckernförde', ('Jay Straße',10,23022,'Essen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (18 ,'Neumünster Zoo', ('Schiller Straße',42,23645,'Neuss','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (19 ,'Plöner Schloss', ('Cody Straße',100,26304,'Braunschweig','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (20 ,'Familien-Freizeitpark Tolk-Schau', ('Hanson Straße',67,26936,'Leipzig','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (21 ,'Kiel Rathausplatz', ('Maple Wood Straße',41,26328,'München','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (22 ,'Hauptbahnhof', ('Randy Straße',6,23409,'Mainz','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (23 ,'Landtag Schleswig-Holstein', ('Johnson Straße',9,26045,'Rostock','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (24 ,'Marine-Ehrenmal Laboe', ('Luster Straße',3,21745,'Wetzlar','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (25 ,'Skulptur "Licht wird Objekt"', ('Browning Straße',30,24885,'Braunschweig','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (26 ,'Denkmal Zar Peter III', ('Ridgeway Straße',45,23321,'München','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (27 ,'Bismarck Denkmal', ('Bultman Straße',27,25133,'Hamburg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (28 ,'Kriegerdenkmal Schlossgarten', ('Pleasure Straße',61,23508,'Hamburg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (29 ,'St. Nikolai', ('Bonner Straße',64,21937,'Nürnberg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (30 ,'St. Nikolai', ('Bonner Straße',64,21937,'Nürnberg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (31 ,'St. Nikolai', ('Bonner Straße',64,21937,'Nürnberg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (32 ,'St. Nikolai', ('Bonner Straße',64,21937,'Nürnberg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (40 ,'St. Nikolai', ('Bonner Straße',64,21937,'Nürnberg','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (41 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (42 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (43 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (44 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (45 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (46 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (47 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (48 ,'Gettorf Zoo', ('Esker Straße',16,25267,'Reutlingen','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (49 ,'Hauptbahnhof', ('Randy Straße',6,23409,'Mainz','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (50 ,'Hauptbahnhof', ('Randy Straße',6,23409,'Mainz','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (51 ,'Hauptbahnhof', ('Randy Straße',6,23409,'Mainz','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (32 ,'Marine-Ehrenmal Laboe', ('Luster Straße',3,21745,'Wetzlar','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (13 ,'Marine-Ehrenmal Laboe', ('Luster Straße',3,21745,'Wetzlar','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (5 ,'Marine-Ehrenmal Laboe', ('Luster Straße',3,21745,'Wetzlar','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (9 ,'Marine-Ehrenmal Laboe', ('Luster Straße',3,21745,'Wetzlar','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (2 ,'Marine-Ehrenmal Laboe', ('Luster Straße',3,21745,'Wetzlar','Germany'));
insert into near_by (coffee_shop_id, poi_name, poi_address) values (2 ,'Bismarck Denkmal', ('Bultman Straße',27,25133,'Hamburg','Germany'));




insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Arusha', 'Brazil', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Benguet', 'Indonesia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Blue Mountain', 'Indonesia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Bourbon', 'Mexico', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Catuai', 'Indonesia', 3);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Charrier', 'Indonesia', 4);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Colombian', 'Indonesia', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Gesha', 'Honduras', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Java', 'Indonesia', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('K7', 'Indonesia', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Mocha', 'Indonesia', 4);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Pacas', 'Brazil', 4);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Ruiru 11', 'Indonesia', 3);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('S795', 'Brazil', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Sagada', 'Colombia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Santos', 'Brazil', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Sarchimor', 'Ethiopia', 3);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Selection 9 ', 'Indonesia', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('SL28', 'Indonesia', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Sulawesi', 'Colombia', 3);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Timor, Arabusta', 'Indonesia', 4);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Typica', 'Indonesia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Uganda', 'Colombia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Brutte', 'Indonesia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Catimor', 'Vietnam', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Caturra', 'Indonesia', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Ethiopian Harar', 'Indonesia', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('French Mission', 'Mexico', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Hawaiian Kona', 'Brazil', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Maragogipe', 'Mexico', 6);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Arusha', 'Brazil', 6);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Benguet', 'Indonesia', 6);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Blue Mountain', 'Indonesia', 6);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Bourbon', 'Mexico', 6);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Catuai', 'Indonesia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Charrier', 'Indonesia', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Colombian', 'Indonesia', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Gesha', 'Honduras', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Java', 'Indonesia', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('K7', 'Indonesia', 6);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Mocha', 'Indonesia', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Pacas', 'Brazil', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Ruiru 11', 'Indonesia', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('S795', 'Brazil', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Sagada', 'Colombia', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Santos', 'Brazil', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Sarchimor', 'Ethiopia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Selection 9 ', 'Indonesia', 3);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('SL28', 'Indonesia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Sulawesi', 'Colombia', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Typica', 'Indonesia', 5);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Uganda', 'Colombia', 6);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Brutte', 'Indonesia', 7);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Catimor', 'Vietnam', 8);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Caturra', 'Indonesia', 8);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Ethiopian Harar', 'Indonesia', 8);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('French Mission', 'Mexico', 8);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Hawaiian Kona', 'Brazil', 8);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Maragogipe', 'Mexico', 8);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Arusha', 'Brazil', 8);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Benguet', 'Indonesia', 9);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Blue Mountain', 'Indonesia', 9);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Bourbon', 'Mexico', 9);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Catuai', 'Indonesia', 9);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Charrier', 'Indonesia', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Colombian', 'Indonesia', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Gesha', 'Honduras', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('Java', 'Indonesia', 2);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('K7', 'Indonesia', 1);
insert into provides (bean_name, bean_provenance, coffee_shop_id) values ('S795', 'Brazil', 5);



insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (23, 'Golf', 143);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (43, 'Lakewood', 272);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (19, 'Cambridge', 63);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (8, 'Lotheville', 299);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (25, 'Brown', 15);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (51, 'Bonner', 146);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (11, '8th', 275);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (40, 'Eagan', 208);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (1, 'Oneill', 256);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (27, 'Bay', 206);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (23, 'Granby', 114);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (23, 'Lighthouse Bay', 67);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (33, 'Porter', 17);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (51, 'Division', 42);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (39, 'Graedel', 154);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (18, 'Surrey', 192);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (40, 'Melvin', 32);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (48, 'Eastlawn', 133);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (45, 'Alpine', 129);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (14, 'Dayton', 163);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (15, 'Superior', 21);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (11, 'Eastlawn', 225);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (14, 'Boyd', 207);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (34, 'Old Shore', 62);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (1, 'Monica', 250);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (5, 'Hallows', 36);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (2, 'Memorial', 106);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (17, 'Commercial', 116);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (11, 'Calypso', 203);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (29, 'Express', 44);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (54, 'Fuller', 121);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (33, 'Bobwhite', 260);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (3, 'Logan', 113);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (35, 'Waywood', 67);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (15, 'Nobel', 59);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (7, 'Lighthouse Bay', 113);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (43, 'Barby', 49);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (43, 'Westport', 59);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (33, 'Mallard', 117);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (1, 'Ludington', 171);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (48, 'Nancy', 10);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (17, 'Holy Cross', 141);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (36, 'Scott', 56);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (7, 'Russell', 104);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (40, 'Harbort', 267);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (23, 'Namekagon', 200);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (50, 'Hovde', 256);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (1, 'Russell', 122);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (38, 'Express', 213);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (35, 'Burning Wood', 118);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (2, 'Namekagon', 200);
insert into reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line) values (2, 'Hovde', 256);

insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Latte Macchiato', 6, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Espresso', 15, null);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 38, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Cappuccino', 33, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè Latte', 50, null);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 51, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè shakerato', 9, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Doppelmokka', 46, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè corretto', 45, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Katerkaffee', 30, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Eiskaffee', 23, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Café noir', 43, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Café noir', 50, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè corretto', 30, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Katerkaffee', 15, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Pharisäer', 11, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Café noir', 10, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Macchiato', 32, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Doppelmokka', 51, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè Latte', 52, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Macchiato', 51, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Americano', 13, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Americano', 24, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 39, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Irish Coffee', 36, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè corretto', 27, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 24, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Bicerin', 42, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 33, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Doppelmokka', 55, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Bicerin', 5, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Flat White', 26, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè shakerato', 23, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 16, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Eiskaffee', 33, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Café noir', 11, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Pharisäer', 54, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Latte Macchiato', 18, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Bicerin', 52, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Milchkaffee ', 46, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè corretto', 16, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Macchiato', 47, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Americano', 11, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Katerkaffee', 14, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè corretto', 28, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Latte Macchiato', 38, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Americano', 42, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Milchkaffee ', 52, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Espresso', 24, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Pharisäer', 13, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Katerkaffee', 7, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Doppelmokka', 15, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Eiskaffee', 39, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Espresso', 51, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Katerkaffee', 55, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Ristretto', 43, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Latte Macchiato', 27, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Irish Coffee', 38, null);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Bicerin', 23, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Irish Coffee', 6, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Espresso', 50, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Pharisäer', 43, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Zarenkaffee', 40, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Latte Macchiato', 11, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Milchkaffee ', 17, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Zarenkaffee', 22, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Flat White', 20, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Milchkaffee ', 34, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Cappuccino', 43, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Doppelmokka', 14, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè corretto', 29, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Eiskaffee', 55, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Eiskaffee', 30, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Ristretto', 38, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Flat White', 36, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Irish Coffee', 27, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Pharisäer', 35, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Cappuccino', 55, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Americano', 38, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè shakerato', 27, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Macchiato', 5, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Eiskaffee', 54, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Espresso', 55, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Bicerin', 49, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 27, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Othello', 44, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Flat White', 19, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Ristretto', 36, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Irish Coffee', 44, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Othello', 31, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Macchiato', 18, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Pharisäer', 20, null);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Cappuccino', 34, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Othello', 26, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè Latte', 51, null);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Eiskaffee', 2, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Espresso', 2, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Bicerin', 2, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Türkischer Kaffee', 2, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Othello', 2, true);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Flat White', 2, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Ristretto', 2, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Irish Coffee', 2, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Macchiato', 2, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Pharisäer', 2, null);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Cappuccino', 2, false);
insert into serves (coffee_drink_name, coffee_shop_id, vegan) values ('Caffè Latte', 2, null);


insert into opens (coffee_shop_id, open, close, weekday) values (1, '8:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (2, '9:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (3, '13:00', '16:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (4, '10:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (5, '12:00', '16:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (6, '11:00', '15:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (7, '11:00', '18:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (8, '12:00', '22:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (9, '7:00', '17:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (10, '12:00', '17:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (11, '9:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (12, '9:00', '18:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (13, '8:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (14, '11:00', '21:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (15, '12:00', '18:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (16, '12:00', '16:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (17, '10:00', '14:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (18, '10:00', '17:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (19, '13:00', '17:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (20, '8:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (21, '13:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (22, '12:00', '16:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (23, '7:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (24, '11:00', '15:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (25, '13:00', '20:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (26, '8:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (27, '8:00', '22:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (28, '12:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (29, '9:00', '14:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (30, '13:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (31, '12:00', '17:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (32, '10:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (33, '7:00', '22:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (34, '9:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (35, '7:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (36, '9:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (37, '9:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (38, '7:00', '22:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (39, '9:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (40, '7:00', '16:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (41, '12:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (42, '7:00', '22:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (43, '12:00', '15:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (44, '10:00', '21:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (45, '7:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (46, '11:00', '20:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (47, '11:00', '14:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (48, '8:00', '15:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (49, '12:00', '18:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (50, '9:00', '14:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (51, '7:00', '21:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (52, '8:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (53, '7:00', '19:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (54, '11:00', '23:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (55, '9:00', '17:00', 'monday');
insert into opens (coffee_shop_id, open, close, weekday) values (1, '10:00', '22:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (2, '12:00', '23:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (3, '9:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (4, '11:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (5, '7:00', '20:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (6, '9:00', '15:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (7, '10:00', '23:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (8, '10:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (9, '12:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (10, '8:00', '21:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (11, '9:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (12, '13:00', '14:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (13, '13:00', '18:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (14, '10:00', '18:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (15, '13:00', '18:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (16, '9:00', '21:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (17, '13:00', '20:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (18, '8:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (19, '9:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (20, '9:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (21, '12:00', '14:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (22, '7:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (23, '9:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (24, '8:00', '14:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (25, '12:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (26, '12:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (27, '10:00', '14:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (28, '7:00', '22:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (29, '12:00', '22:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (30, '7:00', '15:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (31, '11:00', '20:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (32, '7:00', '18:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (33, '13:00', '14:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (34, '11:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (35, '7:00', '22:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (36, '9:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (37, '13:00', '23:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (38, '12:00', '20:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (39, '9:00', '16:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (40, '12:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (41, '9:00', '15:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (42, '9:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (43, '12:00', '19:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (44, '11:00', '16:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (45, '12:00', '14:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (46, '11:00', '16:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (47, '9:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (48, '9:00', '18:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (49, '12:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (50, '8:00', '21:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (51, '12:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (52, '7:00', '23:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (53, '8:00', '22:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (54, '11:00', '17:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (55, '11:00', '23:00', 'tuesday');
insert into opens (coffee_shop_id, open, close, weekday) values (1, '10:00', '23:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (2, '12:00', '19:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (3, '7:00', '21:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (4, '13:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (5, '11:00', '23:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (6, '10:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (7, '8:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (8, '12:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (9, '11:00', '23:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (10, '10:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (11, '8:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (12, '8:00', '21:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (13, '12:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (14, '12:00', '18:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (15, '12:00', '19:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (16, '7:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (17, '8:00', '23:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (18, '11:00', '23:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (19, '10:00', '18:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (20, '10:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (21, '9:00', '23:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (22, '13:00', '18:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (23, '12:00', '21:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (24, '9:00', '21:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (25, '9:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (26, '9:00', '20:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (27, '9:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (28, '7:00', '22:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (29, '12:00', '22:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (30, '10:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (31, '7:00', '21:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (32, '7:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (33, '7:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (34, '13:00', '16:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (35, '13:00', '18:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (36, '11:00', '19:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (37, '8:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (38, '7:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (39, '7:00', '20:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (40, '10:00', '16:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (41, '13:00', '19:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (42, '10:00', '16:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (43, '10:00', '14:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (44, '11:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (45, '9:00', '22:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (46, '11:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (47, '7:00', '21:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (48, '7:00', '21:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (49, '11:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (50, '9:00', '16:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (51, '11:00', '20:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (52, '11:00', '19:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (53, '12:00', '17:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (54, '11:00', '15:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (55, '10:00', '19:00', 'wednesday');
insert into opens (coffee_shop_id, open, close, weekday) values (1, '12:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (2, '11:00', '19:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (3, '12:00', '15:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (4, '13:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (5, '11:00', '18:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (6, '13:00', '18:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (7, '11:00', '21:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (8, '13:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (9, '10:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (10, '11:00', '17:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (11, '11:00', '15:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (12, '13:00', '23:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (13, '11:00', '15:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (14, '7:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (15, '11:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (16, '10:00', '15:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (17, '13:00', '17:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (18, '7:00', '18:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (19, '11:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (20, '9:00', '20:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (21, '13:00', '15:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (22, '10:00', '18:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (23, '10:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (24, '12:00', '15:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (25, '11:00', '17:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (26, '8:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (27, '10:00', '19:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (28, '13:00', '17:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (29, '11:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (30, '10:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (31, '12:00', '23:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (32, '8:00', '20:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (33, '10:00', '19:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (34, '11:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (35, '7:00', '17:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (36, '8:00', '19:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (37, '8:00', '18:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (38, '8:00', '23:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (39, '9:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (40, '10:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (41, '11:00', '15:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (42, '7:00', '17:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (43, '12:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (44, '8:00', '21:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (45, '11:00', '23:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (46, '10:00', '23:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (47, '13:00', '19:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (48, '11:00', '16:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (49, '10:00', '20:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (50, '12:00', '14:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (51, '8:00', '23:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (52, '9:00', '21:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (53, '13:00', '17:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (54, '9:00', '23:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (55, '12:00', '20:00', 'thursday');
insert into opens (coffee_shop_id, open, close, weekday) values (1, '13:00', '18:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (2, '12:00', '19:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (3, '8:00', '22:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (4, '8:00', '16:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (5, '9:00', '17:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (6, '10:00', '22:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (7, '7:00', '16:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (8, '10:00', '15:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (9, '13:00', '14:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (10, '11:00', '19:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (11, '12:00', '14:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (12, '8:00', '15:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (13, '7:00', '17:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (14, '11:00', '23:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (15, '12:00', '22:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (16, '13:00', '15:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (17, '10:00', '22:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (18, '10:00', '23:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (19, '8:00', '14:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (20, '9:00', '18:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (21, '7:00', '15:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (22, '8:00', '20:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (23, '13:00', '20:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (24, '9:00', '17:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (25, '11:00', '15:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (26, '12:00', '22:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (27, '7:00', '17:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (28, '9:00', '21:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (29, '7:00', '15:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (30, '7:00', '23:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (31, '11:00', '17:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (32, '11:00', '16:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (33, '12:00', '16:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (34, '8:00', '19:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (35, '12:00', '20:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (36, '7:00', '18:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (37, '7:00', '18:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (38, '7:00', '15:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (39, '9:00', '14:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (40, '9:00', '17:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (41, '8:00', '21:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (42, '7:00', '19:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (43, '8:00', '18:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (44, '10:00', '18:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (45, '7:00', '19:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (46, '8:00', '16:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (47, '9:00', '19:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (48, '9:00', '15:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (49, '12:00', '19:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (50, '12:00', '19:00', 'friday');
insert into opens (coffee_shop_id, open, close, weekday) values (51, '13:00', '16:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (52, '10:00', '23:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (53, '11:00', '21:00', 'saturday');
insert into opens (coffee_shop_id, open, close, weekday) values (54, '11:00', '14:00', 'sunday');
insert into opens (coffee_shop_id, open, close, weekday) values (55, '7:00', '22:00', 'saturday');


insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 3);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 2);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 7);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 9);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 6);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Aero Press', 5);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 5);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Aero Press', 6);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 11);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 6);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 7);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeekannen', 9);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 8);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 9);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 8);
insert into supplies (equipment_category_name, coffee_shop_id) values ('French Press', 5);
insert into supplies (equipment_category_name, coffee_shop_id) values ('French Press', 6);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 1);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 11);
insert into supplies (equipment_category_name, coffee_shop_id) values ('French Press', 9);
insert into supplies (equipment_category_name, coffee_shop_id) values ('French Press', 8);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 1);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 4);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Brühsieb', 2);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 1);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 2);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 3);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 4);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 5);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 6);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 7);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 8);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Reinigung & Pflege', 9);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 3);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemühlen', 4);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Handfilter', 1);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Handfilter', 2);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Handfilter', 3);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Handfilter', 10);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Handfilter', 9);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemaschinen', 8);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemaschinen', 9);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemaschinen', 2);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemaschinen', 1);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemaschinen', 22);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemaschinen', 21);
insert into supplies (equipment_category_name, coffee_shop_id) values ('Kaffeemaschinen', 11);