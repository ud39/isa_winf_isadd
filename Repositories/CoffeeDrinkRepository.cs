using System.Reflection;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class CoffeeDrinkRepository :  GenericBaseRepository<CoffeeDrink>
    {
        public CoffeeDrinkRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            Keys.Add("name");

            TableName = "coffee_drink";

            _MappingM2DB = Models.Mapping.MappingM2DB.CoffeeDrinkMap;


            //helper strings
            var keyCompare = "";

            foreach (var keyString in Keys)
            {
                //compute keyCompare, CSKeys, AtCSKeys
                if(keyCompare.Length >0){
                    keyCompare += " AND " + keyString + " = @" + keyString.Replace("_", "");
                }

                else
                {
                    keyCompare += keyString + " = @" + keyString.Replace("_","");
                }
            }

            //build GetByID sql query
            GetByIdString = "SELECT * FROM" +" " + TableName + " WHERE "+ keyCompare;


            //GetAll sql query
            GetAllString = "SELECT * FROM"+ " " + TableName;


            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            var possibleProperties = typeof(CoffeeDrink).GetProperties();
            var temp = "";
            foreach (PropertyInfo property in possibleProperties)
            {
                var propertyName = property.Name.ToLower();
                if(temp.Length > 0) temp += ", " + _MappingM2DB[propertyName] + "= @" + propertyName;
                else
                {
                    temp += _MappingM2DB[propertyName] + "= @" + propertyName;
                }
            }
            UpdateString += temp + " WHERE " + keyCompare;

            //Delete sql query
            DeleteString = "DELETE FROM" +" " + TableName + " WHERE " + keyCompare;

        }
    }
}