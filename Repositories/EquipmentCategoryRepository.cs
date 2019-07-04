using System.Reflection;
using Dapper;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;
using WinfADD.Models.Mapping;

namespace WinfADD.Repositories
{
    public class EquipmentCategoryRepository : GenericBaseRepository<EquipmentCategory>
    {
        public EquipmentCategoryRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            // keys
            Keys.Add("name");
            
            TableName = "equipment_category";


             DefaultTypeMap.MatchNamesWithUnderscores = true;

             _MappingM2DB = MappingM2DB.EquipmentCategoryMap;

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

            GetByIdString = "select distinct on (name) name , image_file_name from (select name, image_file_name from Equipment_Category "+
                                           " inner join Equipment_Category_image on name = Equipment_Category_name "+
                                           " inner join image on image_file_name = file_name where content_type = 'preview' union select name, null as file_name from equipment_category) as t " +
                                           " where " + keyCompare +
                                           " order by name, image_file_name";


            
            GetAllString = "select distinct on (name) name , image_file_name from (select name, image_file_name from Equipment_Category "+
            "inner join Equipment_Category_image on name = Equipment_Category_name "+
            "inner join image on image_file_name = file_name where content_type = 'preview' union select name, null as file_name from equipment_category) as t order by name, image_file_name";
            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            
            UpdateString = "UPDATE " + TableName + " SET ";
            PropertyInfo[] possibleProperties = typeof(EquipmentCategory).GetProperties();
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