using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
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
                    keyCompare += " AND " + "(coffee_shop_address)." + keyString + "=@" + keyString;
                }

                else
                {
                    keyCompare += keyString + "=@" + keyString;
                }
            }

            //build GetByID sql query
            GetByIdString = "SELECT * FROM" +" " + tableName + " WHERE "+ keyCompare;


            //GetAll sql query
             PropertyInfo[] possibleProperties = typeof(CoffeeShop).GetProperties();
             var temp = "";

                    foreach (var addressProperty in  typeof(Address).GetProperties())
                    {
                        temp += ", " + "(address)." + addressProperty.Name.ToLower();
                    }






                    GetAllString = "select name, (address).country, (address).town, (address).street_number, (address).street_name, i.image_file_name " +
                    "from coffee_shop a, coffee_shop_image i " +
                    "where equal(a.name, a.address, i.coffee_shop_name, i.coffee_shop_address)";
           
                    
                    // GetAllString =
           //     "SELECT name, (address).street_name, (address).street_number, (address).postal_code, (address).town, (address).country";
            
                

            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + tableName + " SET ";
            //PropertyInfo[] possibleProperties = typeof(Blend).GetProperties();
             temp = "";
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
            DeleteString = "DELETE FROM" +" " + tableName + " WHERE " + keyCompare;
        }
        
            public async Task<CoffeeShop> GetById(string keyString)
                {
        
                    Console.WriteLine("------------------");
                    Console.WriteLine(keyString);
                    
                    using (IDbConnection conn = Connection)
                    {
                       // string sQuery = "SELECT ID, Name, Random FROM Dummies public.Dummies WHERE ID = @ID";
                       var result = await conn.QueryAsync<CoffeeShop>("SELECT * FROM test WHERE keyString = @KeyString", new { KeyString = keyString });
                        return result.FirstOrDefault();
                    }
                }

            
            public override async Task<List<CoffeeShop>> GetAll()
            {
                using (IDbConnection conn = Connection)
                {
              /*      var result = await conn.QueryAsync<CoffeeShop,Address,CoffeeShop>(GetAllString,
                        map: (c, a) =>
                        {
                            c.Address = a;
                            return c;
                        },
                        splitOn: "country");
                    */
             var result = await conn.QueryAsync<CoffeeShop>(GetAllString);
                    return result.ToList();
                }
            }
        
        
    }
}