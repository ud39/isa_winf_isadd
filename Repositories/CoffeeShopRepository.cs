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
using Npgsql;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class CoffeeShopRepository : GenericBaseRepository<CoffeeShop>
    {
        //key fields
    //    protected string tableName;
  //      protected string GetByIdString;
   //     protected string GetAllString;
   //     protected string UpdateString;
   //     protected string DeleteString;


        protected IConfiguration _config;


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
                          "select  e.* from event e, organised_by o where o.coffee_shop_id = @id and  e.id = o.event_id";
           
            using (var conn = Connection)
            {


          var result = await conn.QueryMultipleAsync(GetByIdString, new {id = id});

          var coffeeShop = result.Read<CoffeeShop>().FirstOrDefault();

          Console.WriteLine("-------------------__:" + coffeeShop.Id);
          Console.WriteLine("-------------------__:" + coffeeShop.Name);
          
          Console.WriteLine("-------------------__:" + coffeeShop.FairTrade);
              if (coffeeShop != null)
              {
                  var images = result.Read<Image>().ToList();
                  coffeeShop.Images = images;
                  
                  var events = result.Read<Event>().ToList();
                  coffeeShop.Events = events;
    
              }

                return coffeeShop;
            }
        }
        
    }
}