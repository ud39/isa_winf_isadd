insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class) values
('Coffee_shop_Name3', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), false, false, true, 'Textbeschreibung', false, true, 'www.nene.ne', 2019, true, false, 50, false, false, true, 'niedrig');
insert into coffee_shop (name, address, outdoor, fair_trade, disabled_friendly, description, wlan, child_friendly, website, founding_year, pets_friendly, latte_art, seats, workstation, warm_food, cold_food, price_class) values
('Coffee_shop_Name2', ('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), false, false, true, 'Textbeschreibung', false, true, 'www.nene.ne', 2019, true, false, 50, false, true, true, 'niedrig');

insert into equipment_category values ('Kaffeemühle');
insert into equipment_category values ('categorydummy');
insert into equipment_category values ('categorydummy1');

insert into supplies values ('Kaffeemühle', 1);
insert into supplies values ('Kaffeemühle', 2);

insert into coffee_drink values ('coffeedrinkdummyname', 'descriptiondummy', 't1');
insert into coffee_drink values ('coffeedrinkdummyname1', 'descriptiondummy1', 't2');


insert into serves values ('coffeedrinkdummyname' , 2);
insert into serves values ('coffeedrinkdummyname1' , 2);

insert into poi values ('poidummyname' ,('dummystraße', 5, 23222, 'Dummystadt', 'Dummyland'), 'descriptionText1');
insert into poi values ('poidummyname2323' ,('dummystraße', 5, 23222, 'Dummystadt', 'Dummyland'), 'descriptionText1');
insert into poi values ('poidummyname1' ,('dummystraß1e', 5, 23222, 'Dummystadt', 'Dummyland'), 'descriptionText2');

insert into near_by values (2, 'poidummyname' ,('dummystraße', 5, 23222, 'Dummystadt', 'Dummyland'));
insert into near_by values (2, 'poidummyname1' ,('dummystraß1e', 5, 23222, 'Dummystadt', 'Dummyland'));


insert into reachable_by_bus values (2, 'stationdummy', '81');
insert into reachable_by_bus values (2, 'stationdummy1', '90');

insert into company values ('dummycompany');
insert into company values ('dummycompany1');

insert into owns values ('dummycompany', 2);
insert into owns values ('dummycompany1', 2);

insert into supplies values ('categorydummy', 2);
insert into supplies values ('categorydummy1', 2);



insert into bean values ('dummybean', 'beanprovenance', 'dummytype');
insert into bean values ('dummybean1', 'beanprovenance1',  'dummytype');
insert into bean values ('dummybean2', 'beanprovenance1',  'dummytype');

insert into provides values ('dummybean', 'beanprovenance', 2);
insert into provides values ('dummybean1', 'beanprovenance1', 2);


insert into blend values ('blenddummy', 'Deutschland', 'low');
insert into blend values ('blenddummy1', 'UK', 'high');
insert into blend values ('blenddummy2', 'UK', 'high');

insert into offers values ('blenddummy', 2);
insert into offers values ('blenddummy1', 2);

insert into manufacturer values ('dummymanufacturer');

insert into consists_of values ('coffeedrinkdummyname','dummybean', 'beanprovenance');
insert into consists_of values ('coffeedrinkdummyname1','dummybean', 'beanprovenance');
insert into consists_of values ('coffeedrinkdummyname1','dummybean1', 'beanprovenance1');


insert into produce values ('dummybean', 'beanprovenance', 'dummymanufacturer', 'roasting1', 'productname', true, 'high');
insert into produce values ('dummybean1','beanprovenance1', 'dummymanufacturer', 'roasting1', 'productname1', false, 'low');


insert into composed values ('blenddummy', 'dummybean','beanprovenance', 'dummymanufacturer');
insert into composed values ('blenddummy', 'dummybean1','beanprovenance1', 'dummymanufacturer');


insert into event (start_time, end_time, name, access_fee, description) values ('2019-12-26', '2019-12-27', 'dummyevent1', 5, 'eventdescriptiondummy');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-12-21', '2019-12-25', 'dummyevent', 5, 'eventdescriptiondummy');
insert into event (start_time, end_time, name, access_fee, description) values ('2019-12-22', '2019-12-29', 'dummyevent', 5, 'eventdescriptiondummy');

insert into organised_by values (2, 1);
insert into organised_by values (2, 2);
insert into organised_by values (1, 2);
insert into organised_by values (1, 3);

insert into opens values (2, '18:00:00', '10:00:00', 'friday');
insert into opens values (2, '18:00:00', '10:00:00', 'monday');
insert into opens values (2, '18:00:00', '10:00:00', 'tuesday');
insert into opens values (2, '18:00:00', '10:00:00', 'saturday');
insert into opens values (2, '18:00:00', '10:00:00', 'sunday');


insert into preparation values ('PreparationDummy', 'PreparationDescription', 'Preparationtype');
insert into preparation values ('PreparationDummy1', 'PreparationDescription1', 'Preparationtype1');

insert into includes values (2, 'PreparationDummy', 'coffeedrinkdummyname');
insert into includes values (2, 'PreparationDummy1', 'coffeedrinkdummyname1');

insert into location values (('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 'EventDescriptionDummy');
insert into located values (('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 2, 1);
insert into located values (('Kieler Straße', 5, 24232, 'Kiel', 'Deutschland'), 2, 2);

insert into equipment values ('modeldummy', 'manufacturerDummy', 1987);
insert into equipment values ('modeldummy1', 'manufacturerDummy2', 2007);
insert into equipment values ('modeldummy2', 'manufacturerDummy2', 2007);

insert into sells values ('manufacturerDummy', 1987, 'modeldummy', 'categorydummy', 2);
insert into sells values ('manufacturerDummy2', 2007, 'modeldummy2', 'categorydummy', 2);




-- USER AND RATINGS

insert into public.user values ('user@mail.uni-kiel.de');
insert into user_rating (rating_id, total, coffee_selection, feelgood_factor, service, facilities) values (DEFAULT, 3, 4, 1, 1, 3);
insert into user_rating (rating_id, total, coffee_selection, feelgood_factor, service, facilities) values (DEFAULT, 5, 4, 3, 2, 1);


insert into user_rating (rating_id, total, coffee_selection, feelgood_factor, service, facilities) values (DEFAULT, 5, 4, 3, 2, 0);
insert into rated_by_user values  (1, 2);
insert into rates values (1, 'user@mail.uni-kiel.de', 2);
insert into public.user values ('user1@mail.uni-kiel.de');
insert into user_rating (rating_id, total, coffee_selection, feelgood_factor, service, facilities) values (DEFAULT, 2, 5, 5, 5, 5);
insert into user_rating (rating_id, total, coffee_selection, feelgood_factor, service, facilities) values (DEFAULT, 1, 1, 2, 3, 4);
insert into rated_by_user values  (2, 2);
insert into rated_by_user values  (2, 1);
insert into rates values (2, 'user1@mail.uni-kiel.de', 1);
insert into rates values (2, 'user1@mail.uni-kiel.de', 2);


-- IMAGES

insert into image values ('1.png', 'preview');
insert into image values ('2.png', 'preview');
insert into image values ('3.png', 'gallery');
insert into image values ('event1.png', 'preview');
insert into image values ('event2.png', 'gallery');
insert into image values ('event3.png', 'gallery');

insert into coffee_shop_image values ('1.png',1);
insert into coffee_shop_image values ('2.png',2);
insert into coffee_shop_image values ('3.png',2);

insert into event_image values ('event1.png',1);
insert into event_image values ('event2.png',1);
insert into event_image values ('event3.png',1);

insert into image values ('bean1.image', 'preview');
insert into image values ('bean2.image', 'preview');
insert into image values ('blend1.image', 'preview');
insert into image values ('blend2.image', 'preview');
insert into image values ('equipmentcategory1.image', 'preview');
insert into image values ('bean3.image', 'gallery');
insert into image values ('blend3.image', 'gallery');
insert into image values ('equipmentcategory2.image', 'gallery');

insert into bean_image values ('bean1.image', 'dummybean', 'beanprovenance');
insert into bean_image values ('bean2.image', 'dummybean1', 'beanprovenance1');

insert into blend_image values('blend1.image', 'blenddummy');
insert into blend_image values('blend2.image', 'blenddummy1');
insert into equipment_category_image values('equipmentcategory1.image', 'Kaffeemühle');
insert into bean_image values ('bean3.image', 'dummybean', 'beanprovenance');
insert into blend_image values('blend3.image', 'blenddummy');
insert into equipment_category_image values('equipmentcategory2.image', 'Kaffeemühle');
insert into equipment_category_image values('equipmentcategory2.image', 'categorydummy');

insert into image values ('poi1.png', 'preview');
insert into image values ('poi2.png', 'preview');
insert into image values ('poi3.png', 'gallery');

insert into poi_image values ('poi1.png','poidummyname',('dummystraße',5,23222,'Dummystadt','Dummyland'));
insert into poi_image values ('poi2.png','poidummyname1',('dummystraß1e',5,23222,'Dummystadt','Dummyland'));
insert into poi_image values ('poi3.png','poidummyname',('dummystraße',5,23222,'Dummystadt','Dummyland'));