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
    public abstract class GenericBaseRepository<Table> : ITableRepository<Table>
    {

        //key fields
        protected  List<string> keys = new List<string>();
        protected  string tableName;
        protected  string keyCompare; //key=@key for all key in keys
        protected  string GetByIdString;
        protected  string GetAllString;
        protected  string UpdateString;


        protected  IConfiguration _config;


        public GenericBaseRepository(IConfiguration _config)
        {
            this._config = _config;

            //TODO in extended class
            //TODO add all key names here (maybe lowerCase)
           // keys.Add("key1");

           //TODO write tableName
           tableName = tableName;


           //build GetByID sql query
           keyCompare = "";
           foreach (var keyString in keys)
           {
               if(keyCompare.Length >1)
               keyCompare += " AND " + keyString + "=@" + keyString;
               else
               {
                keyCompare += keyString + "=@" + keyString;
               }
           }
           GetByIdString = "SELECT * FROM " + tableName + " WHERE "+ keyCompare;


           //GetAll sql query
           GetAllString = "SELECT * FROM " + tableName;


           //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
           UpdateString = "UPDATE " + tableName + " SET ";
           PropertyInfo[] possibleProperties = typeof(Table).GetProperties();
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

        }

        private IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);

        public async Task<Table> GetByID(Table tableObject)
        {



                using (IDbConnection conn = Connection)
                {Console.WriteLine("\n GetByID::" + GetByIdString);
                    var result = await conn.QueryAsync<Table>(GetByIdString, tableObject);
                    return result.FirstOrDefault();
                }
        }


        public  async Task<List<Table>> GetAll(Table tableObject)
        {Console.WriteLine("\n GetAll::" + GetAllString);
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Table>(GetAllString, tableObject);
                return result.ToList();
            }
        }


        public async Task<bool> UpdateTable(Table tableObj)
        {Console.WriteLine("\n UpdateTest::" + UpdateString);
            using (IDbConnection conn = Connection)
            {

                var rowsAffected =  await conn.ExecuteAsync(
                    UpdateString,
                    tableObj);

                return rowsAffected > 0;
            }
        }







    }
}