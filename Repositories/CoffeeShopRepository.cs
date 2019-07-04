using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WinfADD.Controllers;
using WinfADD.Models;
using WinfADD.Models.Mapping;

namespace WinfADD.Repositories
{
    public class CoffeeShopRepository : GenericBaseRepository<CoffeeShop, CoffeeShopPreview>
    {
        
        //private IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);

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
            GetByIdString = "SELECT * FROM " + TableName + " WHERE id = @id";
           
            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            PropertyInfo[] possibleProperties = typeof(CoffeeShop).GetProperties();

            //all possible fields
            var temp = "";
            foreach (PropertyInfo property in possibleProperties)
            {
                var propertyName = property.Name.ToLower();
                if(temp.Length > 0) temp += ", " + propertyName + "= @" + propertyName;
                else
                {
                    temp += propertyName + "= @" + propertyName;
                }
            }

            UpdateString += temp + " WHERE " + keyCompare;


            //Delete sql query
            DeleteString = "DELETE FROM " + TableName + " WHERE " + keyCompare;


            GetAllString =
                "select distinct on (id) id, * from (select distinct c.*, i.file_name, to_char(AVG (ur.total),'9D9') as average_total from coffee_shop c, coffee_shop_image ci, image i, user_rating ur, rated_by_user rbu"+
            " where c.id = ci.coffee_shop_id and i.file_name = ci.image_file_name and i.content_type = 'preview'"+
            " and rbu.coffee_shop_id = c.id and rbu.user_rating_id = ur.rating_id "+
            " group by c.id, i.file_name"+
                " union select c1.*, null as file_name, null as average_total from coffee_shop c1) as t order by id, file_name ";

            
        }

        public override async Task<IEnumerable<CoffeeShopPreview>> GetAll()
        {
            
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryMultipleAsync(GetAllString);
                var coffeeshops = result.Read<CoffeeShopPreview>();
            
                return coffeeshops.ToList();
            }
        }        
        public async Task<IEnumerable<CoffeeShopPreview>> GetAllSupply()
        {
            var allSupply = "select distinct on (id) id, * from (select distinct c.*, i.file_name, to_char(AVG (ur.total),'9D9') as average_total from coffee_shop c, coffee_shop_image ci, image i, user_rating ur, rated_by_user rbu"+
                " where c.id = ci.coffee_shop_id and i.file_name = ci.image_file_name and i.content_type = 'preview'"+
                " and rbu.coffee_shop_id = c.id and rbu.user_rating_id = ur.rating_id "+
                " group by c.id, i.file_name" +
                " union select c1.*, null as file_name, null as average_total from coffee_shop c1) as t " +
                " where exists(select * from offers o where o.coffee_shop_id = id) " +
                " or exists(select p from provides p where p.coffee_shop_id = id) " +
                " or exists (select * from supplies s where s.coffee_shop_id = id) " +
                " order by id, file_name ";
    


            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryMultipleAsync(allSupply);
                var coffeeshops = result.Read<CoffeeShopPreview>();
            
                return coffeeshops.ToList();
            }
        }

        public async Task<IEnumerable<CoffeeShopPreview>> GetCoffeeShops(CoffeeShopSearchModel query)
        {
            PropertyInfo[] possibleProperties = typeof(CoffeeShopSearchModel).GetProperties();
            var builder = new SqlBuilder();

            var additionalStatements = "";
            var innerjoin = "";
            var mapping = MappingM2DB.CoffeShopMap;

            foreach (PropertyInfo property in possibleProperties)
            {
                var properties = new Dictionary<string, object>();

       
                mapping.TryGetValue(property.Name.ToLower(), out string propertyName);

                if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "bus_station_name")
                { 
                    innerjoin += " inner join reachable_by_bus r on r.coffee_shop_id = id ";
                    properties.Add(propertyName, query.BusStation);
                    builder.Where( "r." + propertyName + " = ANY" + "(@BusStations)", properties);

                }
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "poi_name")
                {
                    innerjoin += " inner join near_by n on n.coffee_shop_id = id ";
                   
                    properties.Add("poi", query.Poi);
                    builder.Where( "n.poi_name"  + " = ANY" + "(@poi)", properties);
                }
                
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && (propertyName == "name" || propertyName.Contains("address")))
                {
                    properties.Add(property.Name, "%" + property.GetValue(query)+ "%");
                    builder.Where(propertyName +"::citext"+  " LIKE " + "@" + property.Name, properties);
                }

                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName))
                {
                    properties.Add(propertyName, "%" + property.GetValue(query)+ "%");
                    builder.Where(propertyName + "::text" + " LIKE " + "@" + propertyName, properties);
                }
                
            }

            additionalStatements += " inner join coffee_shop_image ci on ci.coffee_shop_id = c.id ";
            additionalStatements += " inner join image i on ci.image_file_name = i.file_name and i.content_type = 'preview'";   
            additionalStatements += " inner join rated_by_user rbu on rbu.coffee_shop_id = c.id ";
            additionalStatements += " inner join user_rating ur on rbu.user_rating_id = ur.rating_id ";
           // builder.Where("i.content_type = 'preview'");

            using (IDbConnection dbConnection = Connection)
            {
                var sql = "Select distinct on (id) id, * from (Select distinct c.*, i.file_name, to_char(AVG (ur.total),'9D9') as average_total from coffee_shop c " + additionalStatements +  "  group by c.id, i.file_name" +
                    " union select c1.*, null as file_name, null as average_total from coffee_shop c1) as t "+ innerjoin + " /**where**/ order by id, file_name";

                var filterCoffeeShops = builder.AddTemplate(sql);
                           Console.WriteLine(sql);
                if (possibleProperties.Length == 0)
                    return await GetAll();
                var result = await dbConnection.QueryAsync<CoffeeShopPreview>(filterCoffeeShops.RawSql,filterCoffeeShops.Parameters);

              return result.ToList();
            }
        }

        
        public async Task<IEnumerable<CoffeeShopPreview>> GetSupplyShops(SearchSupplyShopModel query)
        {
            PropertyInfo[] possibleProperties = typeof(SearchSupplyShopModel).GetProperties();
            var builder = new SqlBuilder();

            var additionalStatements = "";
            var innerjoin = "";
            var mapping = MappingM2DB.CoffeShopMap;

            foreach (PropertyInfo property in possibleProperties)
            {
                var properties = new Dictionary<string, object>();

       
                mapping.TryGetValue(property.Name.ToLower(), out string propertyName);

                if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "bus_station_name")
                { 
                    innerjoin += " inner join reachable_by_bus r on r.coffee_shop_id = id ";
                    properties.Add(propertyName, query.BusStation);
                    builder.Where( "r." + propertyName + " = ANY" + "(@bus_station_name)", properties);

                }
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "poi_name")
                {
                    innerjoin += " inner join near_by n on n.coffee_shop_id = id ";
                   
                    properties.Add("poi", query.Poi);
                    builder.Where( "n.poi_name"  + " = ANY" + "(@poi)", properties);
                }
                
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "equipment_category_name")
                {
                   
                    innerjoin += " inner join supplies s on s.coffee_shop_id = id ";
                   
                    properties.Add(propertyName, query.EquipmentCategories);
                    builder.Where( "s.equipment_category_name::text"  + " = ANY" + "(@equipment_category_name)", properties);
                }

                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName.Contains("bean_name"))
                {
                    innerjoin += " inner join provides p on p.coffee_shop_id = id ";
                   
                    properties.Add("beans", query.Beans);
                    builder.Where( "p.bean_name"  + " = ANY" + "(@beans)", properties);
                }

                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName.Contains("blend_name"))
                {
                    innerjoin += " inner join offers o on o.coffee_shop_id = id ";
                   
                    properties.Add("blends", query.Blends);
                    builder.Where("o.blend_name" + " = ANY" + "(@blends)", properties);
                }
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && (propertyName == "name" || propertyName.Contains("address")))
                {
                    properties.Add(property.Name, "%" + property.GetValue(query)+ "%");
                    builder.Where(propertyName +"::citext"+  " LIKE " + "@" + property.Name, properties);
                }
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName) && propertyName == "roast")
                {
                    innerjoin += "inner join provides pr on pr.coffee_shop_id = id " +
                                 "inner join (select provenance, roast, name as bname from bean) br on pr.bean_name = bname and br.provenance = pr.bean_provenance ";
                    
                    
                    properties.Add(property.Name, property.GetValue(query));
                    builder.Where(propertyName +" = " + "@" + property.Name, properties);
                }
                else if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName))
                {
                    properties.Add(propertyName, "%" + property.GetValue(query)+ "%");
                    builder.Where(propertyName + "::text" + " LIKE " + "@" + propertyName, properties);
                }
                
            }

            additionalStatements += " inner join coffee_shop_image ci on ci.coffee_shop_id = c.id ";
            additionalStatements += " inner join image i on ci.image_file_name = i.file_name and i.content_type = 'preview'";   
            additionalStatements += " inner join rated_by_user rbu on rbu.coffee_shop_id = c.id ";
            additionalStatements += " inner join user_rating ur on rbu.user_rating_id = ur.rating_id ";
           // builder.Where("i.content_type = 'preview'");

            using (IDbConnection dbConnection = Connection)
            {
                var sql = "Select distinct on (id) id, * from (Select distinct c.*, i.file_name, to_char(AVG (ur.total),'9D9') as average_total from coffee_shop c " + additionalStatements +  "  group by c.id, i.file_name" +
                    " union select c1.*, null as file_name, null as average_total from coffee_shop c1) as t "+ innerjoin + " /**where**/ order by id, file_name";

                var filterCoffeeShops = builder.AddTemplate(sql);
                           Console.WriteLine(sql);
                if (possibleProperties.Length == 0)
                    return await GetAll();
                var result = await dbConnection.QueryAsync<CoffeeShopPreview>(filterCoffeeShops.RawSql,filterCoffeeShops.Parameters);

              return result.ToList();
            }
        }
        
        
        public new async Task<CoffeeShop> GetById(CoffeeShop c)
        {

           GetByIdString = 
               "select distinct on(id) id, * from " +
               " (select c.*, o.company_name from coffee_shop c " +
               " inner join owns o on o.coffee_shop_id = c.id and c.id = @id" +
               " union select c1.*, null as company_name " +
               " from coffee_shop c1 where c1.id = @id) as t order by id, company_name; " +

               "select i.* from image i, coffee_shop_image ci where ci.coffee_shop_id = @id and ci.image_file_name = i.file_name;" +

               "select distinct on (id) id, * from ( " +
               " select e.*, i.file_name from event_image ei, image i, event e " +
               " where e.id = ei.event_id and ei.image_file_name = i.file_name and i.content_type = 'preview' " +
               " union select e1.*, null as file_name from event e1 order by id, file_name) as t, organised_by o where o.event_id = id and o.coffee_shop_id = @id and t.end_time > Now(); " +


               "select b.* from provides p, bean b where p.coffee_shop_id = @id and p.bean_name = b.name and p.bean_provenance = b.provenance;" +
               "select b.* from offers o, blend b where o.coffee_shop_id = @id and o.blend_name = b.name;" +
               "select b.* from reachable_by_bus b where b.coffee_shop_id = @id and b.bus_station_name = b.bus_station_name;" +
               "select c.* from coffee_drink c, serves s where s.coffee_shop_id = @id and s.coffee_drink_name = c.name;" +
               "select distinct e.* from equipment_category e, supplies s where s.coffee_shop_id = @id and s.equipment_category_name = e.name;  "+
               
               "select distinct on (name) name, * from (select p1.*, image_file_name from Poi p1 " +
               "inner join poi_image on name = poi_name and poi_address = address " + 
               "inner join image on image_file_name = file_name where content_type = 'preview' union select p2.*, null as file_name from poi p2) as t, near_by n "+
               "where t.name = n.poi_name and t.address = n.poi_address and n.coffee_shop_id = @id order by name, image_file_name;"+
            
               "select o.* from opens o where o.coffee_shop_id = @id;" +
                "select co.company_name from owns co, coffee_shop c where c.id = co.coffee_shop_id and c.id =@id;";
            
           using (var conn = Connection) 
           {


              var result = await conn.QueryMultipleAsync(GetByIdString, c);

              var coffeeShop = result.Read<CoffeeShop>().FirstOrDefault();

              if (coffeeShop == null) return coffeeShop;
                  coffeeShop.Images  = result.Read<Image>().ToList();
                  coffeeShop.Events = result.Read<Event>().ToList();
                  coffeeShop.Beans = result.Read<Bean>().ToList();
                  coffeeShop.Blends = result.Read<Blend>().ToList();
                  coffeeShop.ReachableByBus = result.Read<BusStation>().ToList();
                  coffeeShop.CoffeeDrinks = result.Read<CoffeeDrink>().ToList();
                  coffeeShop.EquipmentCategories = result.Read<EquipmentCategory>().ToList();
                  coffeeShop.ListOfPoi = result.Read<Poi>().ToList();
                  coffeeShop.OpeningTimes = result.Read<OpeningTime>().ToList();
                  coffeeShop.Company = result.Read<Company>().FirstOrDefault();

                  return coffeeShop;
           }
        }


        public override async Task<bool> InsertTable(CoffeeShop coffeeShopObj, IDictionary<string, dynamic> propertyValues)
        {


            //SQL Statements
            var sqlCoffeeShop = "INSERT INTO coffee_shop ";
            var sqlOpeningTimeRelation = "INSERT INTO opens (coffee_shop_id, close, open, weekday) "+
                                         " VALUES (@id, @close, @open,@weekday) ON CONFLICT ON CONSTRAINT opens_pkey DO NOTHING ";
            var sqlCoffeeShopImage = "INSERT INTO coffee_shop_image (image_file_name, coffee_shop_id)" +
              " VALUES (@image_file_name, @coffee_shop_id) ON CONFLICT ON CONSTRAINT coffee_shop_image_image_file_name_key DO NOTHING ";

            var sqlBusStation = "INSERT INTO reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line)" +
            " VALUES (@coffee_shop_id,@bus_station_name, @bus_station_line)";

            var sqlPoiRelation = "INSERT INTO near_by (coffee_shop_id, poi_name, poi_address)" +
                                 " VALUES (@coffee_shop_id, @poi_name, @poi_address)";

            var sqlCompanyRelation =
                "INSERT INTO owns (company_name, coffee_shop_id) VALUES (@company_name, @coffee_shop_id)";
            var sqlCompany =
                "INSERT INTO company (name) VALUES (@name) ON CONFLICT ON CONSTRAINT company_pkey DO NOTHING ";

            var sqlBlendRelation =
                "INSERT INTO offers (blend_name, coffee_shop_id) " +
                "VALUES (@blend_name, @coffee_shop_id)";

            var sqlBeanRelation =
                "Insert INTO provides (bean_name, bean_provenance, coffee_shop_id) " +
                "VALUES (@bean_name, @bean_provenance, @coffee_shop_id)";

            var sqlEquipmentCategoriesRelation =
                "INSERT INTO supplies (equipment_category_name, coffee_shop_id) "+
                " VALUES (@equipment_category_name, @coffee_shop_id) ON CONFLICT ON CONSTRAINT supplies_pkey DO NOTHING ";

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
                //set first character to lower
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




                       await conn.ExecuteAsync(sqlCompany, new {name = coffeeShopObj.Company.Name},
                           transaction: transaction);

                       conn.Execute(sqlCompanyRelation,
                           new
                           {
                               company_name = coffeeShopObj.Company.Name,
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
                                   coffee_shop_id = coffeShopID, vegan = coffeeDrink.Vegan
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





        /*
         * update CoffeeShop and Relationship Tables from CoffeeShop
         */
        public async Task<bool> PartialUpdateCoffeeShop(CoffeeShopUpdateModel coffeeShopObj,
            IDictionary<string, dynamic> fieldsToChange)
        {


            foreach (var (s,d) in fieldsToChange)
            {
                Console.WriteLine("KEY::"+s);
                Console.WriteLine("value::"+d);
            }

            //SQL statements for the transaction
            var coffeeShopSQL = getUpdateQuery(fieldsToChange);

            const string eventSqlInsert =
                "INSERT INTO organised_by (coffee_shop_id, event_id) VALUES (@coffee_shop_id, @event_id) ON CONFLICT ON CONSTRAINT organised_by_pkey DO NOTHING";
            const string eventSqlDelete =
                "DELETE FROM organised_by WHERE coffee_shop_id = @coffee_shop_id AND event_id = @event_id ";
            const string coffeeShopImageSqlInsert =
                "INSERT INTO coffee_shop_image (coffee_shop_id, image_file_name) VALUES (@coffee_shop_id, @image_file_name) ON CONFLICT ON CONSTRAINT coffee_shop_image_pkey DO NOTHING";
            const string coffeeShopImageSqlDelete =
                "DELETE FROM coffee_shop_image WHERE coffee_shop_id = @coffee_shop_id AND image_file_name = @image_file_name";
            const string companyRelationDelete = "DELETE FROM owns WHERE coffee_shop_id = coffee_shop_id";
            const string companyRelationInsert =
                "INSERT INTO owns (company_name, coffee_shop_id) VALUES (@company_name, @coffee_shop_id) ON CONFLICT ON CONSTRAINT owns_pkey DO NOTHING ";
            const string busStationSqlInsert =
                "INSERT INTO reachable_by_bus (coffee_shop_id, bus_station_name, bus_station_line)" +
                " VALUES(@coffee_shop_id, @bus_station_name, @bus_station_line) ON CONFLICT ON CONSTRAINT reachable_by_bus_pkey DO NOTHING ";
            const string busStationSqlDelete =
                "DELETE FROM reachable_by_bus WHERE coffee_shop_id = @coffee_shop_id AND " +
                " bus_station_name = @bus_station_name AND bus_station_line = @bus_station_line)";
            const string poiSqlInsert =
                "INSERT INTO near_by (coffee_shop_id, poi_name, poi_address) VALUES (@coffee_shop_id, @poi_name, @poi_address)";
            const string poiSqlDelete =
                "DELETE FROM near_by WHERE coffee_shop_id = @coffee_shop_id AND poi_name = @poi_name AND poi_address = @poi_address";
            const string coffeeDrinkSqlInsert =
                "INSERT INTO serves (coffee_drink_name, coffee_shop_id, vegan) VALUES (@coffee_drink_name, @coffee_shop_id, @vegan) ";
            const string coffeeDrinkSqlDelete =
                "DELETE FROM serves WHERE coffee_drink_name = @coffee_drink_name AND coffee_shop_id = @coffee_shop_id ";
            const string beanSqlInsert =
                "INSERT INTO provides (bean_name, bean_provenance, coffee_shop_id) VALUES (@bean_name, @bean_provenance, @coffee_shop_id)";
            const string beanSqlDelete =
                "DELETE FROM provides WHERE coffee_shop_id = @coffee_shop_id AND bean_name = @bean_name AND bean_provenance = @bean_provenance";
            const string blendSqlInsert =
                "INSERT INTO offers (blend_name, coffee_shop_id) VALUES (@blend_name, @coffee_shop_id) ";
            const string blendSqlDelete =
                "DELETE FROM offers WHERE blend_name = @blend_name AND coffee_shop_id = @coffee_shop_id";
            const string equipmentCategorySqlInsert =
                "INSERT INTO supplies (equipment_category_name, coffee_shop_id) "+
                " VALUES (@equipment_category_name, @coffee_shop_id) ON CONFLICT ON CONSTRAINT supplies_pkey DO NOTHING ";
            const string equipmentCategorySqlDelete =
                "DELETE FROM supplies WHERE equipment_category_name = @equipment_category_name AND coffee_shop_id = @coffee_shop_id";
            const string opensSqlInsert =
                "INSERT INTO opens (coffee_shop_id, close, open, weekday) VALUES (@coffee_shop_id, @close, @open, @weekday) ON CONFLICT ON CONSTRAINT opens_pkey DO NOTHING ";
            const string opensSqlDelete =
                "DELETE FROM opens WHERE coffee_shop_id = @coffee_shop_id AND close = @close AND open = @open AND weekday = @weekday";



            using (IDbConnection conn = Connection)
            {

                conn.Open();
                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {


                        await conn.ExecuteAsync(coffeeShopSQL, coffeeShopObj, transaction: transaction);

                        /* TODO in Event
                            foreach (Event events in coffeeShopObj.EventsInsert)
                            {
                                await conn.Execute(eventSqlInsert, new {event_id = events.Id,
                                    coffee_shop_id = coffeeShopObj.Id}, transaction: transaction);
                            }
                            foreach (Event events in coffeeShopObj.EventsDelete)
                            {
                                await conn.Execute(eventSqlDelete, new {event_id = events.Id,
                                    coffee_shop_id = coffeeShopObj.Id}, transaction: transaction);
                            }
                            */

                        //images
                        foreach (Image image in coffeeShopObj.ImagesInsert)
                        {
                            await conn.ExecuteAsync(coffeeShopImageSqlInsert, new
                            {
                                coffee_shop_id = coffeeShopObj.Id,
                                image_file_path = image.FileName
                            }, transaction: transaction);
                        }
                        foreach (Image image in coffeeShopObj.ImagesDelete)
                        {
                            await conn.ExecuteAsync(coffeeShopImageSqlDelete, new
                            {
                                coffee_shop_id = coffeeShopObj.Id,
                                image_file_path = image.FileName
                            }, transaction: transaction);
                        }

                        //update Company
                        if (fieldsToChange.ContainsKey("company"))
                        {
                            await conn.ExecuteAsync(companyRelationDelete,
                                new {coffee_shop_id = coffeeShopObj.Id}, transaction: transaction);
                            await conn.ExecuteAsync(companyRelationInsert,
                                new
                                {
                                    coffe_shop_id = coffeeShopObj.Id,
                                    company_name = ((Company) fieldsToChange["company"]).Name
                                });
                        }

                        //update Bus
                        foreach (var bus in coffeeShopObj.ReachableByBusDelete)
                        {
                            await conn.ExecuteAsync(busStationSqlDelete,
                                new {coffee_shop_id = coffeeShopObj.Id,
                                    bus_station_name = bus.Name, bus_station_line = bus.Line
                                }, transaction: transaction);
                        }

                        foreach (var bus in coffeeShopObj.ReachableByBusInsert)
                        {
                            await conn.ExecuteAsync(busStationSqlInsert, new
                            {
                                coffee_shop_id = coffeeShopObj.Id,
                                bus_station_name = bus.Name, bus_station_line = bus.Line
                            }, transaction: transaction);
                        }

                        //update POI
                        foreach (var poi in coffeeShopObj.POIsDelete)
                        {
                            await conn.ExecuteAsync(poiSqlDelete, new {coffe_shop_id = coffeeShopObj.Id,
                                poi_name = poi.Name, poi_address = poi.Address
                            }, transaction: transaction);
                        }

                        foreach (var poi in coffeeShopObj.POIsInsert)
                        {
                            await conn.ExecuteAsync(poiSqlInsert, new
                            {
                                coffee_shop_id = coffeeShopObj.Id,
                                poi_name = poi.Name, poi_address = poi.Address
                            }, transaction: transaction);
                        }

                        //update CoffeDrink
                        foreach (var drink in coffeeShopObj.CoffeeDrinksDelete)
                        {
                            await conn.ExecuteAsync(coffeeDrinkSqlDelete, new {coffee_shop_id = coffeeShopObj.Id,
                                coffee_drink_name = drink.Name
                            }, transaction: transaction);
                        }
                        foreach (var drink in coffeeShopObj.CoffeeDrinksInsert)
                        {
                            await conn.ExecuteAsync(coffeeDrinkSqlInsert, new
                            {
                                coffee_shop_id = coffeeShopObj.Id,
                                coffee_drink_name = drink.Name
                            }, transaction: transaction);
                        }

                        //update Bean
                        foreach (var bean in coffeeShopObj.BeansDelete)
                        {
                            await conn.ExecuteAsync(beanSqlDelete,
                                new {coffee_shop_id = coffeeShopObj.Id,
                                    bean_name = bean.Name, bean_provenance = bean.Provenance
                                }, transaction: transaction);
                        }
                        foreach (var bean in coffeeShopObj.BeansInsert)
                        {
                            await conn.ExecuteAsync(beanSqlDelete, new {coffee_shop_id = coffeeShopObj.Id,
                                bean_name = bean.Name, bean_provenance = bean.Provenance
                                },transaction: transaction);
                        }


                        //update blend
                        foreach (var blend in coffeeShopObj.BlendsDelete)
                        {
                            await conn.ExecuteAsync(blendSqlDelete, new {blend_name = blend.Name,
                                coffee_shop_id = coffeeShopObj.Id }, transaction: transaction);
                        }
                        foreach (var blend in coffeeShopObj.BlendsInsert)
                        {
                            await conn.ExecuteAsync(blendSqlInsert, new {blend_name = blend.Name,
                                coffee_shop_id = coffeeShopObj.Id}, transaction: transaction);
                        }


                        //update EquipmentCategory
                        foreach (var category in coffeeShopObj.EquipmentCategoriesDelete)
                        {
                            await conn.ExecuteAsync(equipmentCategorySqlDelete,
                                new {equipment_category_name = category.Name, coffee_shop_id = coffeeShopObj.Id},
                                transaction: transaction);
                        }
                        foreach (var category in coffeeShopObj.EquipmentCategoriesInsert)
                        {
                            await conn.ExecuteAsync(equipmentCategorySqlInsert,
                                new {equipment_category_name = category.Name, coffee_shop_id = coffeeShopObj.Id},
                                transaction: transaction);
                        }

                        //update Opening Time
                        foreach (var time in coffeeShopObj.OpeningTimesDelete)
                        {
                            await conn.ExecuteAsync(opensSqlDelete, new{coffee_shop_id = coffeeShopObj.Id,
                                close = time.Close, open = time.Open, weekday = time.Weekday}, transaction: transaction);
                        }
                        foreach (var time in coffeeShopObj.OpeningTimesInsert)
                        {
                            await conn.ExecuteAsync(opensSqlInsert, new {coffee_shop_id = coffeeShopObj.Id,
                                close = time.Close, open = time.Open, weekday = time.Weekday
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




                    return true;
                }
            }
        }



        public override async Task<bool> DeleteTable(CoffeeShop coffeeShopObj)
        {
            using (IDbConnection conn = Connection)
            {Console.WriteLine("\n Delete::" + DeleteString);


                var imageSQL = "select i.* from image i, coffee_shop_image ci where ci.coffee_shop_id = "
                               + coffeeShopObj.Id+ " AND ci.image_file_name = i.file_name";
                Console.WriteLine("---------------");
                Console.WriteLine(imageSQL);
                Console.WriteLine("---------------");
                var imageResult = conn.QueryMultiple(imageSQL);

                var Images  = imageResult.Read<Image>().ToList();

                foreach (var image in Images)
                {
                    ImageController.deleteImageInternal(image.FileName, image.ContentType);
                }

                var rowsAffected = await conn.ExecuteAsync(DeleteString, coffeeShopObj );
                return (rowsAffected > 0);
            }
        }



        private string getUpdateQuery(IDictionary<string, dynamic> fieldsToChange)
        {
            var fieldCounter = 0;
            var sqlQuery = "UPDATE coffee_shop SET ";


            PropertyInfo[] possibleProperties = typeof(CoffeeShopInsertModel).GetProperties();
            foreach (PropertyInfo property in possibleProperties)
            {

                var propertyName = property.Name.ToLower();

                if ((!fieldsToChange.ContainsKey(propertyName)) || Keys.Contains(_MappingM2DB[propertyName])) continue;
                sqlQuery += _MappingM2DB[propertyName] + " = @" + propertyName + ",";
                fieldCounter++;
            }


            //nothing to change here
            if (fieldCounter < 1) return "";

            //remove last 'AND'
            sqlQuery = sqlQuery.Remove(sqlQuery.Length - 1);



            //WHERE (matching keys)
            sqlQuery += " WHERE id = @id";


            return sqlQuery;
        }
    }
}
