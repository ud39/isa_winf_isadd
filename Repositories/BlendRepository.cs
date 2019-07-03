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
    public class BlendRepository : GenericBaseRepository<Blend, BlendPreview>
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
                " select name, * from (select b1.*, image_file_name from Blend b1" +
                " left join blend_image on name = blend_name" +
                " left join image on image_file_name = file_name where content_type = 'preview' union select b2.*, null as file_name from blend b2) " +
                " as t left join composed_essential c on c.blend_name = name" +
                " where " + keyCompare + 
                " order by name, image_file_name";

          //  GetByIdString = "select * from blend where " + keyCompare + " ;" +
           //                 "select i.* from image i inner join blend_image bi on i.file_name = bi.image_file_name where bi.blend_name = @Name and i.content_type = 'preview'";

           GetByIdString =
            //   "select b.*, i.file_name from blend b, image i, blend_image bi where b.name = bi.blend_name and bi.image_file_name = i.file_name and i.content_type = 'preview' and name = @Name; " 
            "select * from blend b left join blend_image bi on b.name = bi.blend_name left join image i on bi.image_file_name = i.file_name and i.content_type = 'preview' where b.name = @Name;" +
              "select be.* from bean be, composed_essential ce where ce.blend_name = @Name and be.name = ce.bean_name";

           
           
            GetAllString = "select distinct on (name) name, * from (select b1.*, image_file_name from Blend b1" +
                           " inner join blend_image on name = blend_name" +
                           " inner join image on image_file_name = file_name where content_type = 'preview' union select b2.*, null as file_name from blend b2) as t order by name, image_file_name";    



            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            
            
            var possibleProperties = typeof(Blend).GetProperties();
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
        
        
        public override async Task<IEnumerable<BlendPreview>> GetAll()
        {          
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<BlendPreview>(GetAllString);
            
                return result.ToList();
            }
        }

        public new async Task<BlendPreview> GetById([FromQuery] Blend blend)
        {            
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryMultipleAsync(GetByIdString, blend);

                var b = result.Read<BlendPreview>().FirstOrDefault();
                
                if(b != null)
                    b.Beans= result.Read<BeanPreview>();
            
                return b;
            }
        }

    }
}