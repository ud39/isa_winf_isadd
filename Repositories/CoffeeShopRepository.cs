using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Dapper;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Npgsql;
using WinfADD.Models;

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



            //TEST

            Dictionary<string, string> imageMaps = new Dictionary<string, string>
            {
                {"file_name", "FileName"},
                {"content_type", "ContentType"}

            };

            Dictionary<string, string> eventMaps = new Dictionary<string, string>
            {
                {"event_id", "Id"},
                {"time", "Time"},
                {"access_fee", "AccessFee"},
                {"description", "Description"}

            };


            var defaultMapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {

                var result = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(columnName.ToLower());
                return type.GetProperty(result = result.Replace("_", ""));
            });

        CustomPropertyTypeMap CreateDefaultMap (Type t)
        {
            return new CustomPropertyTypeMap(
                 t,
                (type, columnName) => defaultMapper(type, columnName));
        }


           SqlMapper.SetTypeMap(typeof(CoffeeShop), CreateDefaultMap(typeof(CoffeeShop)));
           SqlMapper.SetTypeMap(typeof(Image), CreateDefaultMap(typeof(Image)));
           SqlMapper.SetTypeMap(typeof(Event), CreateDefaultMap(typeof(Event)));
           SqlMapper.SetTypeMap(typeof(Bean), CreateDefaultMap(typeof(Bean)));
           SqlMapper.SetTypeMap(typeof(Blend), CreateDefaultMap(typeof(Blend)));
           SqlMapper.SetTypeMap(typeof(BusStation), CreateDefaultMap(typeof(BusStation)));
           SqlMapper.SetTypeMap(typeof(CoffeeDrink), CreateDefaultMap(typeof(CoffeeDrink)));
           SqlMapper.SetTypeMap(typeof(Equipment), CreateDefaultMap(typeof(Equipment))); //TODO
           SqlMapper.SetTypeMap(typeof(EquipmentCategory), CreateDefaultMap(typeof(EquipmentCategory)));
           SqlMapper.SetTypeMap(typeof(Location), CreateDefaultMap(typeof(Location))); //TODO
           SqlMapper.SetTypeMap(typeof(OpeningTime), CreateDefaultMap(typeof(OpeningTime)));
           SqlMapper.SetTypeMap(typeof(Poi), CreateDefaultMap(typeof(Poi)));
           SqlMapper.SetTypeMap(typeof(Preparation), CreateDefaultMap(typeof(Preparation)));
           
            tableName = "coffee_shop";


            //helper strings
            var keyCompare = "";

            foreach (var keyString in keys)
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
           

            //GetAll sql query
         //   GetAllString = "SELECT * FROM"+ " " + tableName;


            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + tableName + " SET ";
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

            GetAllString = "SELECT *" + " FROM " + tableName;
            
            Console.WriteLine("----------");
            Console.WriteLine(GetAllString);

            UpdateString += temp + " WHERE " + keyCompare;

            //Delete sql query
            DeleteString = "DELETE FROM" +" " + tableName + " WHERE " + keyCompare;
        }

        public override async Task<List<CoffeeShop>> GetAll()
        {
            Console.WriteLine("\n GetAll::" + GetAllString);
            
            using (IDbConnection conn = Connection)
            {
            var result = await conn.QueryAsync<CoffeeShop>(GetAllString);
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

        public bool InsertCoffeeShop(IDictionary<string,dynamic> propertyValues)
        {


            //get all CoffeeShop properties
            PropertyInfo[] possibleProperties = typeof(CoffeeShop).GetProperties();
            var sqlCoffeeShop = "";
            foreach (PropertyInfo property in possibleProperties)
            {
                var propertyName = property.Name.ToLower();
                Console.WriteLine(propertyName +"::" +propertyValues.ContainsKey(propertyName) + "<->"+property.Name+"::"+propertyValues.ContainsKey(property.Name));
                if(! (propertyValues.ContainsKey(propertyName))) continue;
                if(sqlCoffeeShop.Length > 0) sqlCoffeeShop += ", " + propertyName + "= @" + propertyName;
                else
                {
                    sqlCoffeeShop += propertyName + "= @" + propertyName;
                }
            }
            Console.WriteLine("<------------------------------------------------------------>");
            Console.WriteLine("::"+sqlCoffeeShop);





            using (var conn = Connection)
            {
                using (var transaction = conn.BeginTransaction())
                {
                   // conn.Execute("sql", new { }, transaction: transaction);


                    //transaction.Commit();
                }
            }

            return false;
        }
        
    }
}