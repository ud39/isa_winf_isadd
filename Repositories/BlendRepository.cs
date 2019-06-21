using System;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class BlendRepository : GenericBaseRepository<Blend>
    {
        public BlendRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            //TODO add all key names here //TODO in extended class
            // keys.Add("KeyString");
            Keys.Add("name");
            Keys.Add("manufacturer_name");

            //TODO write tableName
            TableName = "blend";


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
            GetByIdString = "SELECT * FROM" +" " + TableName + " WHERE "+ keyCompare;


            //GetAll sql query
            GetAllString = "SELECT * FROM"+ " " + TableName;


            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            PropertyInfo[] possibleProperties = typeof(Blend).GetProperties();
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
            DeleteString = "DELETE FROM" +" " + TableName + " WHERE " + keyCompare;
        }
    }
}