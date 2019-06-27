using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;
using WinfADD.Models.Mapping;

namespace WinfADD.Repositories
{
    public class BlendRepository : GenericBaseRepository<Blend>
    {
        public BlendRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            TableName = "blend";

            _MappingM2DB = Models.Mapping.MappingM2DB.BlendMap;
            DefaultTypeMap.MatchNamesWithUnderscores = true;


            //helper strings
            Keys.Add("name");

            
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
            GetByIdString =
                "select distinct on (name) name, * from (select b1.*, image_file_name from Blend b1" +
                " inner join blend_image on name = blend_name" +
                " inner join image on image_file_name = file_name where content_type = 'preview' union select b2.*, null as file_name from blend b2) as t "+
                " where " + keyCompare +
                " order by name, image_file_name";    


            GetAllString = "select distinct on (name) name, * from (select b1.*, image_file_name from Blend b1" +
                           " inner join blend_image on name = blend_name" +
                           " inner join image on image_file_name = file_name where content_type = 'preview' union select b2.*, null as file_name from blend b2) as t order by name, image_file_name";    



            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            
            
            PropertyInfo[] possibleProperties = typeof(Blend).GetProperties();
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
        
        
        public async Task<List<BlendPreview>> GetAll()
        {          
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<BlendPreview>(GetAllString);
            
                return result.ToList();
            }
        }

        public async Task<BlendPreview> GetById([FromQuery] Blend blend)
        {            
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<BlendPreview>(GetByIdString, blend);
            
                return result.FirstOrDefault();
            }
        }

    }
}