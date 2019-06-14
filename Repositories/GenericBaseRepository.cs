using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace WinfADD.Repositories
{
    public abstract class GenericBaseRepository<Table> : ITableRepository<Table> where Table : class
    {

        //key fields
        protected List<string> keys = new List<string>();
        protected string tableName;
        protected string GetByIdString;
        protected string GetAllString;
        protected string UpdateString;
        protected string DeleteString;



        protected  IConfiguration _config;


        public GenericBaseRepository(IConfiguration _config)
        {
            this._config = _config;

            //TODO in extended class
            //TODO add all key names here (maybe lowerCase)
           // keys.Add("key1");

           //TODO write tableName
           //tableName = tableName;


           /*
          //helper strings
           var keyCompare = "";        //key=@key for all key in keys
           var CSKeys = "";            //key1,key2,key3
           var CSatKeys = "";          //@key1,@key2,@key3


           //compute keyCompare, CSKeys, AtCSKeys
           foreach (var keyString in keys)
           {
               //compute keyCompare, CSKeys, AtCSKeys
               if(keyCompare.Length >0){
                   keyCompare += " AND " + keyString + "=@" + keyString;
                   CSKeys += ", " + keyString;
                   CSatKeys += ",@" + keyString;
               }

               else
               {
                keyCompare += keyString + "=@" + keyString;
                CSKeys += keyString;
                CSatKeys += "@" + keyString;
               }
           }

           //build GetByID sql query
           GetByIdString = "SELECT * FROM " + tableName + " WHERE "+ keyCompare;


           //GetAll sql query
           GetAllString = "SELECT * FROM " + tableName;


           //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
           UpdateString = "UPDATE " + tableName + " SET ";
           PropertyInfo[] possibleProperties = typeof(Table).GetProperties();

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
           DeleteString = "DELETE FROM " + tableName + " WHERE " + keyCompare;

           */



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

        public async Task<IEnumerable<Table>> GetTables(Table tableObj, IDictionary<string, string> searchProperties)
        {

            var possibleProperties = typeof(Table).GetProperties();

            var sqlQuery = "SELECT * From" + " " + tableName +" WHERE ";
            var whereClause = "";

            foreach (var property in possibleProperties)
            {
                var propertyName = property.Name.ToLower();
                if (!searchProperties.ContainsKey(propertyName)) continue;
                whereClause += " AND " + propertyName + " = " + "@" + propertyName;
            }

            //remove first AND
            whereClause = whereClause.Substring(4);

            using (IDbConnection dbConnection = Connection)
            {
                Console.WriteLine("\n GetByParam::" + sqlQuery + whereClause);
                if (possibleProperties.Length == 0)
                {
                    return await GetAll(tableObj);
                }

                return await dbConnection.QueryAsync<Table>(sqlQuery+whereClause,tableObj);
            }
        }


        public  virtual async Task<List<Table>> GetAll(Table tableObj)
        {Console.WriteLine("\n GetAll::" + GetAllString);
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Table>(GetAllString, tableObj);
                return result.ToList();
            }
        }

        public async Task<bool> InsertTable(Table tableObj, IDictionary<string, string> insertProperties)
        {
            PropertyInfo[] possibleProperties = typeof(Table).GetProperties();


            var CSProperties = "";
            var CSatProperties = "";

            //compute input insert properties
            foreach (PropertyInfo property in possibleProperties)//all possible fields
            {
                var propertyName = property.Name.ToLower();
                if (CSProperties.Length > 0)
                {
                    CSProperties   += ","  + propertyName;
                    CSatProperties += ",@" + propertyName;
                }
                else
                {
                    CSProperties   += propertyName;
                    CSatProperties += "@" + propertyName;
                }
            }

            var insertString = "INSERT INTO"+ " " + tableName + " (" + CSProperties + " ) values (" + CSatProperties +")";


            using (IDbConnection conn = Connection)
            {Console.WriteLine("\n Insert::" + insertString);

                var rowsAffected = await conn.ExecuteAsync(insertString,
                    tableObj);

                return rowsAffected > 0;
            }
        }


        public async Task<bool> UpdateTable(Table tableObj)
        {Console.WriteLine("\n UpdateTable::" + UpdateString);
            using (IDbConnection conn = Connection)
            {
                var rowsAffected =  await conn.ExecuteAsync(
                    UpdateString,
                    tableObj);

                return rowsAffected > 0;
            }
        }

        public async Task<bool> PartialUpdateTable(Table tableObj, IDictionary<string, string> fieldsToChange)
        {
                var fieldCounter = 0;
                var sqlQuery = "UPDATE " +tableName+" SET ";

                PropertyInfo[] possibleProperties = typeof(Table).GetProperties();
                foreach (PropertyInfo property in possibleProperties)
                {

                    var propertyName = property.Name.ToLower();

                    if (!fieldsToChange.ContainsKey(propertyName) || keys.Contains(propertyName)) continue;
                    sqlQuery += propertyName + " = @" + propertyName + ",";
                    fieldCounter++;
                }

                if (fieldCounter < 1) return false;

                //remove last 'AND'
                sqlQuery = sqlQuery.Remove(sqlQuery.Length - 1);



                //WHERE (matching keys)
                sqlQuery += " WHERE";
                foreach (var key in keys)
                {
                    sqlQuery += "  " + key + " = @" + key + " AND";
                }

                //remove last 'AND'
                sqlQuery = sqlQuery.Remove(sqlQuery.Length - 3);

                using (IDbConnection conn = Connection)
                {Console.WriteLine("\n PartialUpdate::" + sqlQuery);

                    var rowsAffected = await conn.ExecuteAsync(sqlQuery, tableObj);

                    return rowsAffected > 0;
                }

        }


        /*
         * DELETE
         */
        public async Task<bool> DeleteTable(Table tableObj)
        {
            using (IDbConnection conn = Connection)
            {Console.WriteLine("\n Delete::" + DeleteString);
                var rowsAffected = await conn.ExecuteAsync(DeleteString, tableObj );
                return (rowsAffected > 0);
            }
        }







    }
}