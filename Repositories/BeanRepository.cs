using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class BeanRepository : GenericBaseRepository<Bean, BeanPreview>
    {
        public BeanRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            Keys.Add("name");
            Keys.Add("provenance");

            TableName = "bean";


            _MappingM2DB = Models.Mapping.MappingM2DB.BeanMap;
            DefaultTypeMap.MatchNamesWithUnderscores = true;


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
            GetByIdString = "select distinct on (name) name, * from (select b1.*, image_file_name from Bean b1" +
                            " inner join bean_image on b1.name = bean_name and b1.provenance = bean_provenance" +
                            " inner join image on image_file_name = file_name where content_type = 'preview' union select b2.*, null as file_name from Bean b2) as t "+
                             "where " + keyCompare +
                            " order by name, image_file_name";


            //GetAll sql query
           // GetAllString = "SELECT * FROM" + " " + TableName + "INNER JOIN " + TableName +
           //                "_image on name = bean_name " +
            //               "INNER JOIN image_file_name = file_name where content_type = 'preview'";
            GetAllString =
                "select distinct on (name) name, * from (select b1.*, image_file_name from Bean b1" +
                " inner join bean_image on b1.name = bean_name and b1.provenance = bean_provenance" +
                " inner join image on image_file_name = file_name where content_type = 'preview' union select b2.*, null as file_name from Bean b2) as t order by name, image_file_name";

            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            var possibleProperties = typeof(Bean).GetProperties();
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

        public new async Task<IEnumerable<BeanPreview>> GetAll()
        {
                        
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<BeanPreview>(GetAllString);
            
                return result.ToList();
            }
        }

        public new async Task<BeanPreview> GetById([FromQuery] Bean bean)
        {            
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<BeanPreview>(GetByIdString, bean);
            
                return result.FirstOrDefault();
            }
        }


    }
}