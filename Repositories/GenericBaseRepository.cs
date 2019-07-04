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
    public abstract class GenericBaseRepository<Table> : ITableRepository<Table> where Table : class
    {

        //key fields
        protected List<string> Keys = new List<string>();
        protected string TableName;
        protected string GetByIdString;
        protected string GetAllString;
        protected string UpdateString;
        protected string DeleteString;

        public IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);


        protected IConfiguration _config;
        protected IDictionary<string, string> _MappingM2DB;


        public GenericBaseRepository(IConfiguration _config)
        {
            this._config = _config;

            SqlMapper.SetTypeMap(typeof(CoffeeShop), MappingConfigurator.CreateMap(typeof(CoffeeShop)));
            SqlMapper.SetTypeMap(typeof(Image), MappingConfigurator.CreateMap(typeof(Image)));
            SqlMapper.SetTypeMap(typeof(Event), MappingConfigurator.CreateMap(typeof(Event)));
            SqlMapper.SetTypeMap(typeof(Bean), MappingConfigurator.CreateMap(typeof(Bean)));
            SqlMapper.SetTypeMap(typeof(Blend), MappingConfigurator.CreateMap(typeof(Blend)));
            SqlMapper.SetTypeMap(typeof(BusStation), MappingConfigurator.CreateMap(typeof(BusStation), MappingConfigurator.BusStationMapper));
            SqlMapper.SetTypeMap(typeof(CoffeeDrink), MappingConfigurator.CreateMap(typeof(CoffeeDrink)));
            SqlMapper.SetTypeMap(typeof(Equipment), MappingConfigurator.CreateMap(typeof(Equipment))); //TODO
            SqlMapper.SetTypeMap(typeof(EquipmentCategory), MappingConfigurator.CreateMap(typeof(EquipmentCategory)));
            SqlMapper.SetTypeMap(typeof(Location), MappingConfigurator.CreateMap(typeof(Location))); //TODO
            SqlMapper.SetTypeMap(typeof(OpeningTime), MappingConfigurator.CreateMap(typeof(OpeningTime)));
            SqlMapper.SetTypeMap(typeof(Poi), MappingConfigurator.CreateMap(typeof(Poi)));
            SqlMapper.SetTypeMap(typeof(Preparation), MappingConfigurator.CreateMap(typeof(Preparation)));
            SqlMapper.SetTypeMap(typeof(CoffeeShopPreview), MappingConfigurator.CreateMap(typeof(CoffeeShopPreview), MappingConfigurator.CoffeeShopPreviewMapper));
            SqlMapper.SetTypeMap(typeof(Event), MappingConfigurator.CreateMap(typeof(Event), MappingConfigurator.EventMapper));
            SqlMapper.SetTypeMap(typeof(EventViewModel), MappingConfigurator.CreateMap(typeof(EventViewModel), MappingConfigurator.EventMapper));

            
            NpgsqlConnection.GlobalTypeMapper.MapComposite<Address>("address");
            
            //TODO in extended class
            //TODO add all key names here (maybe lowerCase)
            // keys.Add("key1");

            //TODO write tableName
            //tableName = tableName;

            //TODO Mapping
            //_MappingM2DB = Models.Mapping.MappingM2DB.TableMap;

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
        

        public virtual async Task<Table> GetById(Table tableObject)
        {
                using (IDbConnection conn = Connection)
                {Console.WriteLine("\n GetByID::" + GetByIdString);
                    var result = await conn.QueryAsync<Table>(GetByIdString, tableObject);
                    return result.FirstOrDefault();
                }
        }
        
        public async Task<IEnumerable<Table>> GetTables(Table tableObj, IDictionary<string, dynamic> searchProperties)
        {

            var possibleProperties = typeof(Table).GetProperties();

            var sqlQuery = "SELECT * From" + " " + TableName +" WHERE ";
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
                    return await GetAll();
                }

                return await dbConnection.QueryAsync<Table>(sqlQuery+whereClause,tableObj);
            }
        }



        public virtual async Task<IEnumerable<Table>> GetAll()
        {Console.WriteLine("\n GetAll::" + GetAllString);
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Table>(GetAllString);
                return result.ToList();
            }
        }

        public virtual async Task<bool> InsertTable(Table tableObj, IDictionary<string, dynamic> insertProperties)
        {
            PropertyInfo[] possibleProperties = typeof(Table).GetProperties();


            var CSProperties = "";
            var CSatProperties = "";

            //compute input insert properties
            foreach (PropertyInfo property in possibleProperties)//all possible fields
            {


                var propertyName = char.ToLower(property.Name[0]).ToString() + property.Name.Substring(1);
                var lowerPropertyName = propertyName.ToLower();

                if ((!insertProperties.ContainsKey(propertyName)) || lowerPropertyName.Equals("id")) continue;

                if (CSProperties.Length > 0)
                {
                    CSProperties   += ","  + _MappingM2DB[lowerPropertyName];
                    CSatProperties += ",@" + propertyName;
                }
                else
                {
                    CSProperties   += _MappingM2DB[lowerPropertyName];
                    CSatProperties += "@" + propertyName;
                }
            }

            var insertString = "INSERT INTO"+ " " + TableName + " (" + CSProperties + " ) values (" + CSatProperties +")";



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

        public virtual async Task<bool> PartialUpdateTable(Table tableObj, IDictionary<string, dynamic> fieldsToChange)
        {
                var fieldCounter = 0;
                var sqlQuery = "UPDATE " + TableName+" SET ";


                PropertyInfo[] possibleProperties = typeof(Table).GetProperties();
                foreach (PropertyInfo property in possibleProperties)
                {

                    var propertyName = property.Name.ToLower();

                    if ((!fieldsToChange.ContainsKey(propertyName)) || Keys.Contains(_MappingM2DB[propertyName])) continue;
                    sqlQuery += _MappingM2DB[propertyName] + " = @" + propertyName + ",";
                    fieldCounter++;
                }


                if (fieldCounter < 1) return false;

                //remove last 'AND'
                sqlQuery = sqlQuery.Remove(sqlQuery.Length - 1);



                //WHERE (matching keys)
                sqlQuery += " WHERE";
                foreach (var key in Keys)
                {
                    sqlQuery += "  " + key + " = @" + key.Replace("_","") + " AND";
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
        public virtual async Task<bool> DeleteTable(Table tableObj)
        {
            using (IDbConnection conn = Connection)
            {Console.WriteLine("\n Delete::" + DeleteString);
                var rowsAffected = await conn.ExecuteAsync(DeleteString, tableObj );
                return (rowsAffected > 0);
            }
        }

    }

    public abstract class GenericBaseRepository<Table, View> : GenericBaseRepository<Table>, ITableRepository<Table,View> where Table : class
    {
        protected GenericBaseRepository(IConfiguration _config) : base(_config)
        {
        }


        public new virtual async Task<IEnumerable<View>> GetAll()
        {Console.WriteLine("\n GetAll::" + GetAllString);
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<View>(GetAllString);
                return result;
            }
        }

        public new virtual async Task<IEnumerable<View>> GetTables(Table tableObj, IDictionary<string, dynamic> searchProperties)
        {

            var possibleProperties = typeof(Table).GetProperties();

            var sqlQuery = "SELECT * From" + " " + TableName +" WHERE ";
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
                    return await GetAll();
                }

                return await dbConnection.QueryAsync<View>(sqlQuery+whereClause,tableObj);
            }
        }
    }
}