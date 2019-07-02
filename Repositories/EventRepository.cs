using System.Collections.Generic;
using System.Data;
using System.Linq;
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

            GetByIdString = "select distinct on (id) id, * from ( " +
                "select e .*, i.file_name from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and content_type = 'preview' "+
                "union select e1.*, null as file_name from event e1 where e1.id = @id order by id, file_name) as t where id =@id; " +
                "select i.* from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and i.content_type != 'preview'";


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
                
                if(result != null)
                 result.Images = queryResult.Read<Image>().ToList();
                
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