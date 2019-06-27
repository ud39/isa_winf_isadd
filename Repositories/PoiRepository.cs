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
    public class PoiRepository : GenericBaseRepository<Poi>
    {
        public PoiRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            // keys
            Keys.Add("name");
            Keys.Add("address");

            //TODO write tableName
            TableName = "Poi";


            NpgsqlConnection.GlobalTypeMapper.MapComposite<Address>("address");
            _MappingM2DB = Models.Mapping.MappingM2DB.PoiMap;
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
            GetByIdString = "select distinct on (name) name, address, description, image_file_name from (select p1.*, image_file_name from Poi p1" +
                " inner join poi_image on name = poi_name and poi_address = address" +
                " inner join image on image_file_name = file_name where content_type = 'preview' union select p2.*, null as file_name from poi p2) as t " +
                " where " + keyCompare +
                " order by name, image_file_name";
                
           GetAllString = "select distinct on (name) name, * from (select p1.*, image_file_name from Poi p1" +
          " inner join poi_image on name = poi_name and poi_address = address" + 
          " inner join image on image_file_name = file_name where content_type = 'preview' union select p2.*, null as file_name from poi p2) as t order by name, image_file_name";

            
            
            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";
            PropertyInfo[] possibleProperties = typeof(Poi).GetProperties();
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

        public async Task<List<Poi>> GetAll()
        {
                        
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Poi>(GetAllString);
            
                return result.ToList();
            }
        }


        public async Task<Poi> GetById(string id)
        {            
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Poi>(GetByIdString, new {id = id});
            
                return result.FirstOrDefault();
            }
        }


    }
}