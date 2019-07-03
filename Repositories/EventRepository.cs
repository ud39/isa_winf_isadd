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
    public class EventRepository : GenericBaseRepository<Event>
    
    {
        public EventRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            TableName = "event";


            _MappingM2DB = Models.Mapping.MappingM2DB.EventMap;
            DefaultTypeMap.MatchNamesWithUnderscores = true;

            //helper strings
            Keys.Add("id");


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



            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";


            var possibleProperties = typeof(Event).GetProperties();
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


            GetByIdString = "select distinct on (id) id, * from ( " +
                "select e .*, i.file_name from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and content_type = 'preview' "+
                "union select e1.*, null as file_name from event e1 where e1.id = @id order by id, file_name) as t where id =@id; " +
                "select i.* from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and i.content_type != 'preview';"+
                " select c.* from coffee_shop c, located l, event e where c.id = l.coffee_shop_id and e.id = l.event_id and e.id = @id; " +
                 " select location_address from coffee_shop c, located l, event e where c.id = l.coffee_shop_id and e.id = l.event_id and e.id = @id";


            GetAllString = "select distinct on (id) id, * from ( "+
                " select e.*, i.file_name from event_image ei, image i, event e "+
                " where e.id = ei.event_id and ei.image_file_name = i.file_name and i.content_type = 'preview' "+
                " union select e1.*, null as file_name from event e1 order by id, file_name) as t";

        }
        
        
        public new virtual async Task<Event> GetById(Event e)
        {
            using (IDbConnection conn = Connection)
            {
                
                var queryResult = await conn.QueryMultipleAsync(GetByIdString, e);
                
                var result = queryResult.Read<Event>().FirstOrDefault();

                if (result != null)
                {
                    result.Images = queryResult.Read<Image>();
                    result.CoffeeShops = queryResult.Read<CoffeeShopPreview>();
                    result.Address = queryResult.Read<Address>().FirstOrDefault();

                }
                 
                return result;
            }
        }
        
        
        public new async Task<IEnumerable<Event>> GetAll()
        {
            
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Event>(GetAllString);

                return result;
            }


        }

    }
    
    
}