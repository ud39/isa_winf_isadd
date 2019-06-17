using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class CoffeeShopRepository: ICoffeeShopRepository
    {
        //key fields
        protected List<string> keys = new List<string>();
        protected string tableName;
        protected string GetByIdString;
        protected string GetAllString;
        protected string UpdateString;
        protected string DeleteString;


        protected  IConfiguration _config;


        private IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);

        public CoffeeShopRepository(IConfiguration _config)
        {
            this._config = _config;

            NpgsqlConnection.GlobalTypeMapper.MapComposite<Address>("address");
            DefaultTypeMap.MatchNamesWithUnderscores = true;
            

            
            //TEST
            
            Dictionary<string, string> columnMaps = new Dictionary<string, string>
            {
                { "image_file_name", "File_Name"}
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                return type.GetProperty(columnMaps.ContainsKey(columnName) ? columnMaps[columnName] : columnName);
            });
            
            var imageMap = new CustomPropertyTypeMap(
                typeof(Image),
                (type, columnName) => mapper(type, columnName));

            SqlMapper.SetTypeMap(typeof(Image), imageMap);
            //TESTEND
            
            
            //TODO add all key names here //TODO in extended class
            // keys.Add("KeyString");
            keys.Add("name");
            keys.Add("country");
            keys.Add("town");
            keys.Add("postal_code");
            keys.Add("street_name");
            keys.Add("street_number");

            
            //TODO write tableName
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

        public async Task<List<CoffeeShop>> GetAll()
        {
            Console.WriteLine("\n GetAll::" + GetAllString);
            
            using (IDbConnection conn = Connection)
            {
         /*       var result = await conn.QueryAsync<CoffeeShop, Address, CoffeeShop>(GetAllString,
                    map: (c, a) =>
                    {
                        c.Address = a;
                        
                        return c;
                    }, splitOn: "country"
                    
                    );
                */    
            var result = await conn.QueryAsync<CoffeeShop>(GetAllString);
                return result.ToList();
            }
        }

        public Task<CoffeeShop> GetByID(CoffeeShop tableObj)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CoffeeShop>> GetTables(CoffeeShop tableObj, IDictionary<string, string> searchProperties)
        {
            throw new NotImplementedException();
        }

        public Task<bool> InsertTable(CoffeeShop tableObj, IDictionary<string, string> insertProperties)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTable(CoffeeShop tableObj)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateTable(CoffeeShop testObj)
        {
            throw new NotImplementedException();
        }

        public Task<bool> PartialUpdateTable(CoffeeShop tableObj, IDictionary<string, string> fieldsToChange)
        {
            throw new NotImplementedException();
        }

        public async Task<CoffeeShop> GetById(int id)
        {

          
           GetByIdString = "select c.*, i.image_file_name from coffee_shop c inner join coffee_shop_image i on c.id = i.coffee_shop_id where c.id = @id";
        
        
           // Console.Write("---------------------------------------------------------: " + coffeeShop.Name);
            using (var conn = Connection)
            {
                
                var images = await conn.QueryAsync<Image>(GetByIdString, new {id = id});
                var cs = await conn.QueryAsync<CoffeeShop>(GetByIdString, new {id = id});
                var cs1 = cs.FirstOrDefault();
                //var cs = result.Read<CoffeeShop>().FirstOrDefault();
               // var images = result.Read<Image>();
                if(cs1 != null)
                    cs1.Images = images;
                
                
                foreach (var i in images)
                {
                    Console.WriteLine("-------:    " + i.File_Name);

                }
              
                return cs1;
            }
        }
        
    }
}