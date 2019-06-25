using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
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
                    keyCompare += "(address)." + keyString + "=@" + keyString;
                }
            }

            //build GetByID sql query
           // GetByIdString = "SELECT name FROM " + tableName + " WHERE "+ keyCompare;
           
            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            PropertyInfo[] possibleProperties = typeof(CoffeeShop).GetProperties();
            var temp = "";
            foreach (PropertyInfo property in possibleProperties)
            {
                var propertyName = property.Name.ToLower();

                if (propertyName == "address")
                {
                    PropertyInfo[] possiblePropertiesAddress = typeof(Address).GetProperties();
                    foreach (PropertyInfo addressProperty in possiblePropertiesAddress)
                    {
                        propertyName = addressProperty.Name.ToLower();
                        
                            temp += ", "  + "(address)." +  propertyName;
                        
                        
                    }

                }
             
                else if(temp.Length > 0) 
                    temp += ", " + propertyName;
                else
                {
                    temp += propertyName;
                }
            }

            GetAllString =
                "select c.*, i.file_name from coffee_shop c, coffee_shop_image ci, image i " +
                "where c.id = ci.coffee_shop_id and i.file_name = ci.image_file_name and i.content_type = 'preview'";

            
            UpdateString += temp + " WHERE " + keyCompare;

            //Delete sql query
            DeleteString = "DELETE FROM" +" " + TableName + " WHERE " + keyCompare;
        }

        public async Task<List<CoffeeShopPreview>> GetAll()
        {
            
            using (IDbConnection conn = Connection)
            {
            var result = await conn.QueryAsync<CoffeeShopPreview>(GetAllString);
                return result.ToList();
            }
        }

        public async Task<List<CoffeeShopPreview>> GetCoffeeShops(CoffeeShopSearchModel query)
        {
            PropertyInfo[] possibleProperties = typeof(CoffeeShopSearchModel).GetProperties();
            var builder = new SqlBuilder();
            
            var filterCoffeeShops = builder.AddTemplate("Select * from coffee_shop /**where**/  ");

            var mapping = MappingM2DB.CoffeShopMap;

            foreach (PropertyInfo property in possibleProperties)
            {
                var properties = new Dictionary<string, object>();

       
                mapping.TryGetValue(property.Name.ToLower(), out string propertyName);

                if (property.GetValue(query) != null && !string.IsNullOrEmpty(propertyName))
                {
                    properties.Add(propertyName, "%" + property.GetValue(query)+ "%");
                    builder.Where(propertyName + "::text" + " LIKE " + "@" + propertyName, properties);
                }
                
            }
        
            using (IDbConnection dbConnection = Connection)
            {
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
                           "select b.* from provides p, bean b where p.coffee_shop_id = @id and p.bean_name = b.name and p.bean_manufacturer_name = b.manufacturer_name;" +
                           "select b.* from offers o, blend b where o.coffee_shop_id = @id and o.blend_name = b.name and o.blend_manufacturer_name = b.manufacturer_name;" +
                           "select b.* from bus_station b, reachable r where r.coffee_shop_id = @id and r.bus_station_name = b.name;" +
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


            //get all CoffeeShop properties
            PropertyInfo[] possibleProperties = typeof(CoffeeShopInsertModel).GetProperties();
            var sqlCoffeeShop = "INSERT INTO coffee_shop ";
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

            sqlCoffeeShop += "(" + dbFiledNames + ")" + " VALUES " + "(" + modelFieldNames + ")";

            Console.WriteLine("<------------------------------------------------------------>");
            Console.WriteLine("::"+sqlCoffeeShop);


            Console.WriteLine("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>");


            Console.WriteLine("name::"+coffeeShopObj.Name);
            Console.WriteLine("address:"+coffeeShopObj.Address.Town);
            Console.WriteLine("time:"+coffeeShopObj.OpeningTimes);

            Console.WriteLine("<//////////////////////////////////////////////////////////>");



            using (var conn = Connection)
            {

               // using (var transaction = conn.BeginTransaction())
                {}
                   // conn.Execute("sql", new { }, transaction: transaction);
                   var rowsAffected = conn.Execute(sqlCoffeeShop, coffeeShopObj);

                   Console.WriteLine("-_-_-_-_"+rowsAffected);
                   return rowsAffected > 0;
                   //transaction.Commit();


            }


        }
        
    }
}