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

namespace WinfADD.Repositories
{
    public class CoffeeShopRepository: GenericBaseRepository<CoffeeShop>
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
                    keyCompare += " AND " + keyString + "=@" + keyString;
                }

                else
                {
                    keyCompare += "(address)." + keyString + "=@" + keyString;
                }
            }

            //build GetByID sql query
            GetByIdString = "SELECT * FROM" +" " + tableName + " WHERE "+ keyCompare;


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

            GetAllString = "SELECT " + temp + " FROM " + tableName;
            
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
        
    }
}