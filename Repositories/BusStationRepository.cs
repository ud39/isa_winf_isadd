using System.Reflection;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class BusStationRepository : GenericBaseRepository<BusStation>
    {
        public BusStationRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            Keys.Add("name");
            Keys.Add("line");

            TableName = "reachable_by_bus";

            _MappingM2DB = Models.Mapping.MappingM2DB.BusStationMap;


            //helper strings
            var keyCompare = "";

            foreach (var keyString in Keys)
            {
                //compute keyCompare, CSKeys, AtCSKeys
                if(keyCompare.Length >0){
                    keyCompare += " AND " + _MappingM2DB[keyString] + " = @" + keyString.Replace("_", "");
                }

                else
                {
                    keyCompare += _MappingM2DB[keyString] + " = @" + keyString.Replace("_","");
                }
            }

            //build GetByID sql query
            GetByIdString = "SELECT * FROM" +" " + TableName + " WHERE "+ keyCompare;


            //GetAll sql query
            GetAllString = "SELECT * FROM"+ " " + TableName;


            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            var possibleProperties = typeof(BusStation).GetProperties();
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