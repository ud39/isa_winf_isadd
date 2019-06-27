using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WinfADD.Models;
using WinfADD.Models.Mapping;

namespace WinfADD.Repositories
{
    public class CoffeeShopRepository : GenericBaseRepository<CoffeeShop>
    {
        
        private IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);

        public CoffeeShopRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            NpgsqlConnection.GlobalTypeMapper.MapComposite<Address>("address");
            DefaultTypeMap.MatchNamesWithUnderscores = true;


            TableName = "coffee_shop";
            Keys.Add("id");

            //mapping M2DB
            _MappingM2DB = MappingM2DB.CoffeShopMap;


            //helper strings
            var keyCompare = "";

            foreach (var keyString in Keys)
            {
                //compute keyCompare, CSKeys, AtCSKeys
                if(keyCompare.Length >0){
                    keyCompare += " AND " + keyString + "=@" + keyString;
                }

                else
                {
                    keyCompare += keyString + "=@" + keyString;
                }
            }

            //build GetByID sql query
           // GetByIdString = "SELECT name FROM " + tableName + " WHERE "+ keyCompare;
           
            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";


            GetAllString =
                "select distinct c.*, i.file_name, to_char(AVG (ur.total),'9D9') as average_total from coffee_shop c, coffee_shop_image ci, image i, user_rating ur, rated_by_user rbu " +
                " where c.id = ci.coffee_shop_id and i.file_name = ci.image_file_name and i.content_type = 'preview'" +
                " and rbu.coffee_shop_id = c.id and rbu.user_rating_id = ur.rating_id " +
                "group by c.id, i.file_name";

        }

        public async Task<List<CoffeeShopPreview>> GetAll()
        {
            
            using (IDbConnection conn = Connection)
            {
            var result = await conn.QueryMultipleAsync(GetAllString);
            var coffeeshops = result.Read<CoffeeShopPreview>();
            
                return coffeeshops.ToList();
            }
        }

        public async Task<List<CoffeeShopPreview>> GetCoffeeShops(CoffeeShopSearchModel query)
        {
            PropertyInfo[] possibleProperties = typeof(CoffeeShopSearchModel).GetProperties();
            var builder = new SqlBuilder();

            var additionalStatements = "";
          
            var mapping = MappingM2DB.CoffeShopMap;

            foreach (PropertyInfo property in possibleProperties)
            {
                var properties = new Dictionary<string, object>();

       
                mapping.TryGetValue(property.Name.ToLower(), out string propertyName);

                if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "bus_station_name")
                {
                   additionalStatements += " inner join reachable_by_bus r on r.coffee_shop_id = id ";
                   properties.Add(propertyName, property.GetValue(query));
                   builder.Where( "r." + propertyName + " = " + "@" + propertyName, properties);
                }
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "poi_name")
                {
                    additionalStatements += " inner join near_by n on n.coffee_shop_id = id ";
                   
                    properties.Add("poi", query.Poi);
                    builder.Where( "n.poi_name"  + " = ANY" + "(@poi)", properties);
                }
                
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "name")
                {
                    properties.Add(propertyName, "%" + property.GetValue(query)+ "%");
                    builder.Where(propertyName + " LIKE " + "@" + propertyName, properties);
                }
                
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName))
                {
                    properties.Add(propertyName, "%" + property.GetValue(query)+ "%");
                    builder.Where(propertyName + "::text" + " LIKE " + "@" + propertyName, properties);
                }
                
            }

            additionalStatements += " inner join coffee_shop_image ci on ci.coffee_shop_id = id ";
            additionalStatements += " inner join image i on ci.image_file_name = i.file_name ";
            builder.Where("i.content_type = 'preview'");

            using (IDbConnection dbConnection = Connection)
            {
                var sql = "Select * from coffee_shop" + additionalStatements +  " /**where**/  ";

                var filterCoffeeShops = builder.AddTemplate(sql);

                if (possibleProperties.Length == 0)
                    return await GetAll();
                var result = await dbConnection.QueryAsync<CoffeeShopPreview>(filterCoffeeShops.RawSql,filterCoffeeShops.Parameters);

              return result.ToList();
            }
        }

        public async Task<CoffeeShop> GetById(int id)
        {

          
           //GetByIdString = "select c.*, i.image_file_name from coffee_shop c inner join coffee_shop_image i on c.id = i.coffee_shop_id where c.id = @id";



           GetByIdString = "select * from coffee_shop where id = @id;" +
                           "select i.* from image i, coffee_shop_image ci where ci.coffee_shop_id = @id and ci.image_file_name = i.file_name;" +
                           "select e.* from event e, organised_by o where o.coffee_shop_id = @id and  e.id = o.event_id;" +
                           "select b.* from provides p, bean b where p.coffee_shop_id = @id and p.bean_name = b.name and p.bean_provenance = b.provenance;" +
                           "select b.* from offers o, blend b where o.coffee_shop_id = @id and o.blend_name = b.name;" +
                           "select b.* from reachable_by_bus b where b.coffee_shop_id = @id and b.bus_station_name = b.bus_station_name;" +
                           "select c.* from coffee_drink c, serves s where s.coffee_shop_id = @id and s.coffee_drink_name = c.name;" +
                           // Equipment  "select e.* from equipment e, sells s where s.coffee_shop_id = 2 and s.equipment_manufacturer_name = e.manufacturer_name and s.equipment_model_name = e.model_name and s.equipment_year_of_origin = e.year_of_origin;";
                           "select distinct e.* from equipment_category e, sells s where s.coffee_shop_id = @id and s.equipment_category_name = e.name;" +
                           //"select o.* from opens o where o.coffee_shop_id = @id;";
                           "select p.* from poi p, near_by n where n.coffee_shop_id = @id and n.poi_name = p.name and n.poi_address = p.address";
           
            using (var conn = Connection)
            {


          var result = await conn.QueryMultipleAsync(GetByIdString, new {id = id});

          var coffeeShop = result.Read<CoffeeShop>().FirstOrDefault();

              if (coffeeShop != null)
              {
                  coffeeShop.Images  = result.Read<Image>().ToList();
                  coffeeShop.Events = result.Read<Event>().ToList();
                  coffeeShop.Beans = result.Read<Bean>().ToList();
                  coffeeShop.Blends = result.Read<Blend>().ToList();
                  coffeeShop.ReachableByBus = result.Read<BusStation>().ToList();
                  coffeeShop.CoffeeDrinks = result.Read<CoffeeDrink>().ToList();
                  coffeeShop.EquipmentCategories = result.Read<EquipmentCategory>().ToList();
               //   coffeeShop.OpeningTimes = result.Read<OpeningTime>().ToList();
                  coffeeShop.ListOfPoi = result.Read<Poi>().ToList();

              }

              return coffeeShop;
            }
        }

        public bool InsertCoffeeShop(CoffeeShop coffeeShopObj, IDictionary<string,dynamic> propertyValues)
        {


            //SQL Statements //TODO CONST STATIC
            var sqlCoffeeShop = "INSERT INTO coffee_shop ";
            var sqlOpeningTimeRelation = "INSERT INTO opens (coffee_shop_id, close, open, weekday)" +
                                         "VALUES (@id, @close, @open,@weekday)";
            var sqlCoffeeShopImage = "INSERT INTO coffee_shop_image (image_file_name, coffee_shop_id)"+
                                     " VALUES (@image_file_name, @coffee_shop_id)";

            var sqlBusStation = "INSERT INTO reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line)" +
            " VALUES (@coffee_shop_id,@bus_station_name, @bus_station_line)";

            var sqlPoiRelation = "INSERT INTO near_by (coffee_shop_id, poi_name, poi_address)" +
                                 " VALUES (@coffee_shop_id, @poi_name, @poi_address)";

            var sqlCompanyRelation =
                "INSERT INTO owns (company_name, coffee_shop_id) VALUES (@company_name, @coffee_shop_id)";

            var sqlBlendRelation =
                "INSERT INTO offers (blend_name, coffee_shop_id) " +
                "VALUES (@blend_name, @coffee_shop_id)";

            var sqlBeanRelation =
                "Insert INTO provides (bean_name, bean_provenance, coffee_shop_id) " +
                "VALUES (@bean_name, @bean_provenance, @coffee_shop_id)";

            var sqlEquipmentCategoriesRelation =
                "INSERT INTO supplies (equipment_category_name, coffee_shop_id) " +
                "VALUES (@equipment_category_name, @coffee_shop_id)";

            var sqlEventRelation =
                "INSERT INTO organised_by (coffee_shop_id, event_id) " +
                "VALUES (@coffee_shop_id, @event_id)";

            var sqlCoffeDrinkRelation =
                "INSERT INTO serves (coffee_drink_name, coffee_shop_id, vegan) " +
                "VALUES (@coffee_drink_name, @coffee_shop_id, @vegan)";

            var sqlPreperationRelation =
                "INSERT INTO includes (coffee_shop_id, preparation_name, coffee_drink_name) " +
                "VALUES (@coffee_shop_id, @preparation_name, @coffee_drink_name)";
            //



            //get all CoffeeShop properties
            PropertyInfo[] possibleProperties = typeof(CoffeeShopInsertModel).GetProperties();
            var dbFiledNames = "";
            var modelFieldNames = "";
            foreach (PropertyInfo property in possibleProperties)
            {
                var propertyName = char.ToLower(property.Name[0]).ToString() + property.Name.Substring(1);
                if(! (propertyValues.ContainsKey(propertyName)) || propertyName.Equals("id")) continue;
                if (dbFiledNames.Length > 0)
                {
                    dbFiledNames += ", " + _MappingM2DB[propertyName.ToLower()] ;
                    modelFieldNames += ",@" + propertyName;
                }
                else
                {
                    dbFiledNames += _MappingM2DB[propertyName.ToLower()];
                    modelFieldNames += "@" + propertyName;
                }
            }


            sqlCoffeeShop += "(" + dbFiledNames + ")" + " VALUES " + "(" + modelFieldNames + ") RETURNING id";
            Console.WriteLine("INSERT SHOP:: " + sqlCoffeeShop);








            //QUERY
            using (var conn = Connection)
            {

                    conn.Open();
               using (var transaction = conn.BeginTransaction())
               {
                   try
                   {

                       //CoffeeShop ID generated by Postgres
                       var coffeShopID =
                           conn.ExecuteScalar<int>(sqlCoffeeShop, coffeeShopObj, transaction: transaction);

                       //OpeningTimes
                       foreach (var openingTime in coffeeShopObj.OpeningTimes)
                       {
                           conn.Execute(sqlOpeningTimeRelation,
                               new
                               {
                                   id = coffeShopID,
                                   close = openingTime.Close,
                                   open = openingTime.Open,
                                   weekday = openingTime.Weekday
                               }, transaction: transaction);
                       }


                       foreach (var image in coffeeShopObj.Images)
                       {
                           Console.WriteLine(image.FileName + "<->" + image.ContentType);

                           conn.Execute(sqlCoffeeShopImage,
                               new {image_file_name = image.FileName, coffee_shop_id = coffeShopID},
                               transaction: transaction);
                       }

                       foreach (var busStation in coffeeShopObj.ReachableByBus)
                       {
                           conn.Execute(sqlBusStation,
                               new
                               {
                                   coffee_shop_id = coffeShopID, bus_station_name = busStation.Name,
                                   bus_station_line = busStation.Line
                               }, transaction: transaction);
                       }

                       foreach (var poi in coffeeShopObj.ListOfPoi)
                       {
                           conn.Execute(sqlPoiRelation,
                               new
                               {
                                   coffee_shop_id = coffeShopID, poi_name = poi.Name,
                                   poi_address = poi.Address
                               }, transaction: transaction);
                       }


                       conn.Execute(sqlCompanyRelation,
                           new
                           {
                               company_name = coffeeShopObj.CompanyName,
                               coffee_shop_id = coffeShopID
                           }, transaction: transaction);


                       foreach (var blend in coffeeShopObj.Blends)
                       {
                           conn.Execute(sqlBlendRelation,
                               new
                               {
                                   blend_name = blend.Name, coffee_shop_id = coffeShopID
                               }, transaction: transaction);
                       }


                       foreach (var bean in coffeeShopObj.Beans)
                       {
                           conn.Execute(sqlBeanRelation,
                               new
                               {
                                   bean_name = bean.Name, bean_provenance = bean.Provenance,
                                   coffee_shop_id = coffeShopID
                               }, transaction: transaction);
                       }

                       foreach (var equipmentCategory in coffeeShopObj.EquipmentCategories)
                       {
                           conn.Execute(sqlEquipmentCategoriesRelation,
                               new
                               {
                                   equipment_category_name = equipmentCategory.Name,
                                   coffee_shop_id = coffeShopID
                               }, transaction: transaction);
                       }

                       foreach (var _event in coffeeShopObj.Events)
                       {
                           conn.Execute(sqlEventRelation,
                               new {coffee_shop_id = coffeShopID, event_id = _event.Id}, transaction: transaction);
                       }



                       foreach (var coffeeDrink in coffeeShopObj.CoffeeDrinks)
                       {

                           conn.Execute(sqlCoffeDrinkRelation,
                               new
                               {
                                   coffee_drink_name = coffeeDrink.Name,
                                   coffee_shop_id = coffeShopID, vegan = coffeeDrink.vegan
                               }, transaction: transaction);

                           if (coffeeDrink.Preparations == null || !coffeeDrink.Preparations.Any()) continue;
                           foreach (var preparation in coffeeDrink.Preparations)

                               conn.Execute(sqlPreperationRelation,
                                   new
                                   {
                                       coffee_shop_id = coffeShopID,
                                       preparation_name = preparation.Name, coffee_drink_name = coffeeDrink.Name
                                   }, transaction: transaction);
                       }


                       transaction.Commit();

                   }
                   catch (Exception e)
                   {
                       Console.WriteLine(e);
                       transaction.Rollback();
                       conn.Close();
                       return false;
                   }

               }

               conn.Close();
               return true;

            }
        }


        public override async Task<bool> DeleteTable(CoffeeShop tableObj)
        {
            using (IDbConnection conn = Connection)
            {Console.WriteLine("\n Delete::" + DeleteString);
                var sqlEventDelete = "DELETE FROM event e WHERE NOT EXISTS(SELECT )";

                /*
                DELETE FROM link_group lg WHERE  NOT EXISTS ( SELECT 1FROM   link_reply lr
                    WHERE  lr.which_group = lg.link_group_id
                    );";
                    */
                var rowsAffected = await conn.ExecuteAsync(DeleteString, tableObj );
                return (rowsAffected > 0);
            }
        }
    }
}
